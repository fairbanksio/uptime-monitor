import React, { useState, useContext } from 'react'
import { Button, Input, Select } from '@chakra-ui/react'

import { NotificationContext } from '../../contexts/NotificationContext'
import ListNotifications from './ListNotifications.js'

function CreateNotification() {
  const { createNotification } = useContext(NotificationContext)

  let [notificationInfo, setNotificationInfo] = useState({
    name: '',
    type: '',
    config: {
      slackWebhook: '',
    },
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNotificationInfo({ ...notificationInfo, [name]: value })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCreateNotification()
    }
  }

  const handleConfigChange = (event) => {
    const { name, value } = event.target
    setNotificationInfo({ ...notificationInfo, config: { [name]: value } })
  }

  const handleClear = () => {
    notificationInfo = setNotificationInfo({
      name: '',
      type: '',
      config: {
        slackWebhook: '',
      },
    })
  }

  const handleCreateNotification = () => {
    createNotification(notificationInfo, (result) => {
      if (result.status === 'success') {
        handleClear()
      }
    })
  }

  return (
    <div>
      <div>
        <ListNotifications />
      </div>
      <br />
      <Input
        type="text"
        placeholder="Name"
        required
        value={notificationInfo.name}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        name="name"
      />

      <Select
        placeholder="Notification Type"
        value={notificationInfo.type}
        onChange={handleInputChange}
        name="type"
      >
        <option value="email">Email</option>
        <option value="slack">Slack</option>
      </Select>

      {notificationInfo.type && notificationInfo.type === 'slack' ? (
        <Input
          type="text"
          placeholder="Slack Webhook URL"
          required
          value={notificationInfo.config.slackWebhook}
          onChange={handleConfigChange}
          onKeyDown={handleKeyDown}
          name="slackWebhook"
        />
      ) : null}

      {notificationInfo.type && notificationInfo.type === 'email' ? (
        <Input
          type="text"
          placeholder="Email Address"
          required
          value={notificationInfo.config.email}
          onChange={handleConfigChange}
          onKeyDown={handleKeyDown}
          name="emailAddress"
        />
      ) : null}

      <div style={{ marginTop: '10px' }}>
        <Button
          onClick={handleCreateNotification}
          variant="solid"
          colorScheme="purple"
        >
          Add
        </Button>
        <Button variant="ghost" colorScheme="grey" mr={3}>
          Clear
        </Button>
      </div>
    </div>
  )
}

export default CreateNotification

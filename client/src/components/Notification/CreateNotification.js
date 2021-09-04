import React, { useState, useContext } from 'react'
import { Button, Input, Select } from '@chakra-ui/react'

import { NotificationContext } from '../../contexts/NotificationContext'
import ListNotifications from './ListNotifications.js'
import isValidUrl from '../../util/isValidUrl'
import isValidEmail from '../../util/isValidEmail'

function CreateNotification() {
  const { createNotification, loading } = useContext(NotificationContext)

  let [notificationInfo, setNotificationInfo] = useState({
    name: '',
    type: '',
    config: {
      slackWebhook: '',
      email: '',
    },
  })

  const [invalidName, isInvalidName] = React.useState(null)
  const [invalidType, isInvalidType] = React.useState(null)
  const [invalidSlack, isInvalidSlack] = React.useState(null)
  const [invalidEmail, isInvalidEmail] = React.useState(null)

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
        email: '',
      },
    })
  }

  const verifyForm = () => {
    if (notificationInfo.name && notificationInfo.name.length > 0) {
      isInvalidName(false)
    } else isInvalidName(true)

    if (notificationInfo.type && notificationInfo.type.length > 0) {
      isInvalidType(false)
    } else isInvalidType(true)

    if (
      notificationInfo &&
      notificationInfo.type === 'slack' &&
      notificationInfo.config &&
      notificationInfo.config.slackWebhook &&
      notificationInfo.config.slackWebhook.length > 0
    ) {
      // Check this is a real url
      if (isValidUrl(notificationInfo.config.slackWebhook)) {
        isInvalidSlack(false)
      } else {
        isInvalidSlack(true)
      }
    } else isInvalidSlack(true)

    if (
      notificationInfo &&
      notificationInfo.type === 'email' &&
      notificationInfo.config &&
      notificationInfo.config.email &&
      notificationInfo.config.email.length > 0
    ) {
      // Check this is a real email
      if (isValidEmail(notificationInfo.config.email)) {
        isInvalidEmail(true)
      } else {
        isInvalidEmail(false)
      }
    } else isInvalidEmail(true)

    if (
      invalidName === false &&
      invalidType === false &&
      (invalidSlack === false || invalidEmail === false)
    ) {
      return true
    } else {
      return false
    }
  }

  const handleCreateNotification = () => {
    if (verifyForm() && !invalidName && !invalidType) {
      if (
        notificationInfo.type === 'email' &&
        notificationInfo.config.email.length > 0 &&
        invalidEmail === false
      ) {
        createNotification(notificationInfo, (result) => {
          if (result.status === 'success') {
            handleClear()
            // find a way to close the drawer?
          }
        })
      } else if (
        notificationInfo.type === 'slack' &&
        notificationInfo.config.slackWebhook.length > 0 &&
        invalidSlack === false
      ) {
        createNotification(notificationInfo, (result) => {
          if (result.status === 'success') {
            handleClear()
            // find a way to close the drawer?
          }
        })
      } else {
        setTimeout(() => {
          isInvalidName(null)
          isInvalidType(null)
          isInvalidSlack(null)
          isInvalidEmail(null)
        }, 1200)
      }
    } else {
      setTimeout(() => {
        isInvalidName(null)
        isInvalidType(null)
        isInvalidSlack(null)
        isInvalidEmail(null)
      }, 1200)
    }
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
        isInvalid={invalidName}
      />

      <Select
        placeholder="Notification Type"
        value={notificationInfo.type}
        onChange={handleInputChange}
        name="type"
        isInvalid={invalidType}
      >
        <option disabled value="email">
          Email
        </option>
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
          isInvalid={invalidSlack}
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
          isInvalid={invalidEmail}
        />
      ) : null}

      <div style={{ marginTop: '10px' }}>
        <Button
          onClick={handleCreateNotification}
          variant="solid"
          colorScheme="purple"
          isLoading={loading}
        >
          Add
        </Button>
        <Button onClick={handleClear} variant="ghost" colorScheme="grey" mr={3}>
          Clear
        </Button>
      </div>
    </div>
  )
}

export default CreateNotification

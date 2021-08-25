import React, { useState, useContext } from 'react'
import { Button, Input, Select } from '@chakra-ui/react'

import { NotificationContext } from '../../contexts/NotificationContext'

function CreateNotification() {
  const { createNotification } = useContext(NotificationContext)

  const [notificationInfo, setNotificationInfo] = useState({
    name: '',
    type: 'slack',
    config: {
      slackWebhook: '',
    },
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNotificationInfo({ ...notificationInfo, [name]: value })
  }

  const handleConfigChange = (event) => {
    const { name, value } = event.target
    setNotificationInfo({ ...notificationInfo, config: { [name]: value } })
  }

  const handleCreateNotification = () => {
    createNotification(notificationInfo, (result) => {
      if (result.status === 'success') {
        //history.push("/")
      }
    })
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <Input
            type="text"
            placeholder="Name"
            required
            value={notificationInfo.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <Select
            placeholder="Notification Type"
            value={notificationInfo.type}
            onChange={handleInputChange}
            defaultValue="slack"
            name="type"
          >
            <option disabled value="email">
              Email
            </option>
            <option value="slack">Slack</option>
          </Select>
        </div>

        <div className="form-group">
          <Input
            type="text"
            placeholder="Slack Webhook URL"
            required
            value={notificationInfo.config.slackWebhook}
            onChange={handleConfigChange}
            name="slackWebhook"
          />
        </div>
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
    </div>
  )
}

export default CreateNotification

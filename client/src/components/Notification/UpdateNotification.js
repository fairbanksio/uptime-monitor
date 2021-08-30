import React, { useState, useContext } from 'react'
import { Button, Center, Input, Select } from '@chakra-ui/react'

import { NotificationContext } from '../../contexts/NotificationContext'

function UpdateNotification(props) {
  const { updateNotification } = useContext(NotificationContext)
  const { notification } = props
  const [notificationInfo, setNotificationInfo] = useState(notification)
  const [visible, setVisible] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNotificationInfo({ ...notificationInfo, [name]: value })
  }

  const handleConfigChange = (event) => {
    const { name, value } = event.target
    setNotificationInfo({ ...notificationInfo, config: { [name]: value } })
  }

  const handleUpdateNotification = () => {
    updateNotification(notificationInfo, (result) => {
      if (result.status === 'success') {
        //history.push("/")
      }
    })
    setVisible(false)
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }
  if (!visible) {
    return (
      <Button colorScheme="purple" size="xs" onClick={toggleVisible}>
        update
      </Button>
    )
  } else {
    return (
      <div>
        <Input
          type="text"
          placeholder="Name"
          isRequired={true}
          value={notificationInfo.name}
          onChange={handleInputChange}
          name="name"
        />
        <Center>
          <Select
            placeholder="Notification Type"
            value={notificationInfo.type}
            onChange={handleInputChange}
            name="type"
          >
            <option value="email">Email</option>
            <option value="slack">Slack</option>
          </Select>{' '}
        </Center>

        <Input
          type="text"
          placeholder="URL"
          isRequired={true}
          value={notificationInfo.config.slackWebhook}
          onChange={handleConfigChange}
          name="slackWebhook"
        />
        <br />
        <Button
          colorScheme="purple"
          size="xs"
          onClick={handleUpdateNotification}
        >
          update
        </Button>
      </div>
    )
  }
}

export default UpdateNotification

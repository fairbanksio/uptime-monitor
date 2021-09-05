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
      mailTo: '',
      mailFrom: '',
      mailUsername: '',
      mailPass: '',
      mailHost: '',
    },
  })

  const [invalidName, isInvalidName] = React.useState(null)
  const [invalidType, isInvalidType] = React.useState(null)
  const [invalidSlack, isInvalidSlack] = React.useState(null)
  const [invalidEmail, isInvalidEmail] = React.useState(null)
  const [invalidMailTo, isInvalidMailTo] = React.useState(null)
  const [invalidMailFrom, isInvalidMailFrom] = React.useState(null)
  const [invalidMailHost, isInvalidMailHost] = React.useState(null)
  const [invalidMailUsername, isInvalidMailUsername] = React.useState(null)
  const [invalidMailPassword, isInvalidMailPassword] = React.useState(null)

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
    // Name
    if (notificationInfo.name && notificationInfo.name.length > 1) {
      isInvalidName(false)
    } else isInvalidName(true)

    // Type
    if (notificationInfo.type && notificationInfo.type.length > 1) {
      isInvalidType(false)
    } else isInvalidType(true)

    // Slack
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

    // MailTo
    if (
      notificationInfo &&
      notificationInfo.type === 'email' &&
      notificationInfo.config &&
      notificationInfo.config.mailTo &&
      notificationInfo.config.mailTo.length > 1
    ) {
      // Check this is a real email
      if (isValidEmail(notificationInfo.config.mailTo)) {
        isInvalidMailTo(false)
      } else {
        isInvalidMailTo(true)
      }
    } else {
      isInvalidMailTo(true)
    }

    // MailFrom
    if (
      notificationInfo &&
      notificationInfo.type === 'email' &&
      notificationInfo.config &&
      notificationInfo.config.mailFrom &&
      notificationInfo.config.mailFrom.length > 0
    ) {
      // Check this is a real email
      if (isValidEmail(notificationInfo.config.mailFrom)) {
        isInvalidMailFrom(false)
      } else {
        isInvalidMailFrom(true)
      }
    } else {
      isInvalidMailFrom(true)
    }

    // MailHost
    if (notificationInfo.config.mailHost && notificationInfo.config.mailHost.length > 1) {
      isInvalidMailHost(false)
    } else isInvalidMailHost(true)

    // MailUsername
    if (notificationInfo.config.mailUsername && notificationInfo.config.mailUsername.length > 1) {
      isInvalidMailUsername(false)
    } else isInvalidMailUsername(true)

    // MailPassword
    if (notificationInfo.config.mailPass && notificationInfo.config.mailPass.length > 1) {
      isInvalidMailPassword(false)
    } else isInvalidMailPassword(true)

    if (!invalidName && !invalidType) {
      switch(notificationInfo.type){
        case "slack":
          if(!invalidSlack){
            return true
          } else {
            return false
          }
        case "email":
          if(!invalidMailTo && !invalidMailFrom && !invalidMailHost && !invalidMailUsername && !invalidMailPassword){
            return true
          } else {
            return false
          }
        default:
          return false
      }

    } else {
      return false
    }
  }

  const handleConfigChange = (event) => {
    const { name, value } = event.target
    const oldConfig = notificationInfo.config
    const newConfig = {...oldConfig, [name]: value}
    setNotificationInfo({ ...notificationInfo, config: newConfig })
  }

  const handleClear = () => {
    notificationInfo = setNotificationInfo({
      name: '',
      type: '',
      config: {
        slackWebhook: '',
        mailTo: '',
        mailFrom: '',
        mailUsername: '',
        mailPass: '',
        mailHost: '',
      },
    })
  }
  
  const handleCreateNotification = () => {
    if (verifyForm() && !invalidName && !invalidType) {
      if (
        notificationInfo.type === 'email' &&
        notificationInfo.config.mailTo.length > 1 &&
        invalidMailTo === false
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
          isInvalidName(false)
          isInvalidType(false)
          isInvalidSlack(false)
          isInvalidMailTo(false)
        }, 1200)
      }
    } else {
      setTimeout(() => {
        isInvalidName(false)
        isInvalidType(false)
        isInvalidSlack(false)
        isInvalidMailTo(false)
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
        <option value="email">
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
          placeholder="Recipients"
          required
          value={notificationInfo.config.mailTo}
          onChange={handleConfigChange}
          onKeyDown={handleKeyDown}
          name="mailTo"
          isInvalid={invalidMailTo}
        />
      ) : null}
      {notificationInfo.type && notificationInfo.type === 'email' ? (
        <Input
          type="text"
          placeholder="From Address"
          required
          value={notificationInfo.config.mailFrom}
          onChange={handleConfigChange}
          onKeyDown={handleKeyDown}
          name="mailFrom"
          isInvalid={invalidMailFrom}
        />
      ) : null}
      {notificationInfo.type && notificationInfo.type === 'email' ? (
        <Input
          type="text"
          placeholder="Host"
          required
          value={notificationInfo.config.mailHost}
          onChange={handleConfigChange}
          onKeyDown={handleKeyDown}
          name="mailHost"
          isInvalid={invalidMailHost}
        />
      ) : null}
      {notificationInfo.type && notificationInfo.type === 'email' ? (
        <Input
          type="text"
          placeholder="Username"
          required
          value={notificationInfo.config.mailUsername}
          onChange={handleConfigChange}
          onKeyDown={handleKeyDown}
          name="mailUsername"
          isInvalid={invalidMailUsername}
        />
      ) : null}
      {notificationInfo.type && notificationInfo.type === 'email' ? (
        <Input
          type="password"
          placeholder="Password"
          required
          value={notificationInfo.config.mailPassword}
          onChange={handleConfigChange}
          onKeyDown={handleKeyDown}
          name="mailPass"
          isInvalid={invalidMailPassword}
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

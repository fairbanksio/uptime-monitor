import React, { useState, useContext, useEffect } from 'react'
import { Button, Input, Select } from '@chakra-ui/react'

import { NotificationContext } from '../../contexts/NotificationContext'
import ListNotifications from './ListNotifications.js'
import isValidUrl from '../../util/isValidUrl'
import isValidEmail from '../../util/isValidEmail'

function CreateNotification() {
  const { createNotification, loading } = useContext(NotificationContext)
  const initNotificationInfo = {
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
  }

  const initFormValidation = {
    formErrors: {},
    nameValid: null,
    typeValid: null,
    slackWebhookValid: null,
    mailToValid: null,
    mailFromValid: null,
    mailHostValid: null,
    mailUsernameValid: null,
    mailPassValid: null
  }

  let [notificationInfo, setNotificationInfo] = useState(initNotificationInfo)

  let [formValidation, setFormValidation] = useState(initFormValidation)

  let [formValid, setFormValid] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNotificationInfo({ ...notificationInfo, [name]: value })
    validateField(name, value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCreateNotification()
    }
  }

  const handleConfigChange = (event) => {
    const { name, value } = event.target
    const oldConfig = notificationInfo.config
    const newConfig = {...oldConfig, [name]: value}
    setNotificationInfo({ ...notificationInfo, config: newConfig })
    validateField(name, value)
  }

  const handleClear = () => {
    setNotificationInfo(initNotificationInfo)
    setFormValidation(initFormValidation)
  }
  
  const handleCreateNotification = () => {
    if(formValid){
      createNotification(notificationInfo, (result) => {
        if (result.status === 'success') {
          handleClear()
          // find a way to close the drawer?
        }
      })
    } else {
      // toast here
      console.log("you must fill out the form properly")
    }
  }

  const validateField = (fieldName, value) => {
    // get existing form errors
    let newFormValidation = formValidation
  
    // update validation errors 
    switch(fieldName) {
      case 'name':
        newFormValidation.nameValid = value.length >= 1;
        newFormValidation.formErrors.name = newFormValidation.nameValid ? '' : ' is too short';
        break;
      case 'type':
        newFormValidation.typeValid = value.length >= 1;
        newFormValidation.formErrors.type = newFormValidation.nameValid ? '' : ' you must select a notification type';
        break;
      case 'slackWebhook':
        newFormValidation.slackWebhookValid = isValidUrl(value)
        newFormValidation.formErrors.slackWebhook = newFormValidation.slackWebhookValid ? '' : ' you must select a notification type';
        break;
      case 'mailTo':
        newFormValidation.mailToValid = isValidEmail(value)
        newFormValidation.formErrors.mailTo = newFormValidation.mailToValid ? '' : ' you must enter a valid email';
        break;
      case 'mailFrom':
        newFormValidation.mailFromValid = isValidEmail(value)
        newFormValidation.formErrors.mailFrom = newFormValidation.mailFromValid ? '' : ' you must enter a valid email';
        break;
      case 'mailHost':
        newFormValidation.mailHostValid = value.length >= 1;
        newFormValidation.formErrors.mailHost = newFormValidation.mailHostValid ? '' : ' is too short';
        break;
      case 'mailUsername':
        newFormValidation.mailUsernameValid = value.length >= 1;
        newFormValidation.formErrors.mailUsername = newFormValidation.mailUsernameValid ? '' : ' is too short';
        break;
      case 'mailPass':
        newFormValidation.mailPassValid = value.length >= 1;
        newFormValidation.formErrors.mailPass = newFormValidation.mailPassValid ? '' : ' is too short';
        break;
      default:
        break;
    }

    setFormValidation({
      ...formValidation, ...newFormValidation
    });

  }

  const validateForm = () => {
    if(formValidation.nameValid && formValidation.typeValid && notificationInfo.type === 'slack'){
      if(formValidation.slackWebhookValid){
        setFormValid(true)
      } else {
        setFormValid(false)
      }
    // validate for when email is chosen
    } else if (formValidation.nameValid && formValidation.typeValid && notificationInfo.type === 'email'){
      if(formValidation.mailToValid && formValidation.mailFromValid && formValidation.mailHostValid && formValidation.mailUsernameValid && formValidation.mailPassValid ){
        setFormValid(true)
      } else {
        setFormValid(false)
      }
    } else {
      setFormValid(false)
    }
  }

  useEffect(() => {
    validateForm()
    //eslint-disable-next-line
  }, [formValidation])

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
        isInvalid={!formValidation.nameValid && formValidation.nameValid !== null}
      />
      <div>{formValidation.nameValid}</div>

      <Select
        placeholder="Notification Type"
        value={notificationInfo.type}
        onChange={handleInputChange}
        name="type"
        isInvalid={!formValidation.typeValid && formValidation.typeValid !== null}
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
          isInvalid={!formValidation.slackWebhookValid && formValidation.slackWebhookValid !== null}
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
          isInvalid={!formValidation.mailToValid && formValidation.mailToValid !== null}
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
          isInvalid={!formValidation.mailFromValid && formValidation.mailFromValid !== null}
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
          isInvalid={!formValidation.mailHostValid && formValidation.mailHostValid !== null}
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
          isInvalid={!formValidation.mailUsernameValid && formValidation.mailUsernameValid !== null}
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
          isInvalid={!formValidation.mailPassValid && formValidation.mailPassValid !== null}
        />
      ) : null}

      <div style={{ marginTop: '10px' }}>
        <Button disabled={!formValid}
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

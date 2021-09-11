import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  Button,
  Checkbox,
  Input,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormLabel,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlack } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

import { MonitorContext } from '../../contexts/MonitorContext'
import { NotificationContext } from '../../contexts/NotificationContext'

import isValidUrl from '../../util/isValidUrl'

function UpdateMonitor(props) {
  const { updateMonitor } = useContext(MonitorContext)
  const { notifications } = useContext(NotificationContext)
  const { monitor } = props
  const [monitorInfo, setMonitorInfo] = useState(monitor)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()

  const initFormValidation = {
    formErrors: {},
    nameValid: null,
    typeValid: null,
    intervalValid: null,
    httpUrlValid: null,
    httpKeywordValid: null,
  }
  let [formValidation, setFormValidation] = useState(initFormValidation)

  let [formValid, setFormValid] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setMonitorInfo({ ...monitorInfo, [name]: value })
    validateField(name, value)
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    setMonitorInfo({ ...monitorInfo, [name]: checked })
  }

  const handleConfigChange = (event) => {
    const { name, value } = event.target
    const oldConfig = monitorInfo.config
    const newConfig = { ...oldConfig, [name]: value }
    setMonitorInfo({ ...monitorInfo, config: newConfig })
    validateField(name, value)
  }

  const handleUpdateMonitor = () => {
    if (formValid) {
      updateMonitor(monitorInfo, (result) => {
        if (result.status === 'success') {
          //history.push("/")
        }
      })
      onClose()
    }
  }

  const handleNotificationChange = (event) => {
    const { id, checked } = event.target
    let newNotifications = monitorInfo.notifications

    if (checked) {
      newNotifications.push(id)
    } else {
      newNotifications = newNotifications.filter((item) => item !== id)
    }

    setMonitorInfo({ ...monitorInfo, notifications: newNotifications })
  }

  useEffect(() => {
    let newNotifications = monitorInfo.notifications
    monitorInfo.notifications.forEach((existingNotification) => {
      let found = false
      notifications.forEach((newNotification) => {
        if (found !== true) {
          if (newNotification._id === existingNotification) {
            found = true
          }
        }
      })
      if (!found) {
        // define new notifications as existing notifications where the item is not equal to our current item
        newNotifications = newNotifications.filter(
          (item) => item !== existingNotification
        )
      }
    })

    setMonitorInfo({ ...monitorInfo, notifications: newNotifications })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications])

  const validateField = (fieldName, value) => {
    // get existing form errors
    let newFormValidation = formValidation

    // update validation errors
    switch (fieldName) {
      case 'name':
        newFormValidation.nameValid = value.length >= 1
        newFormValidation.formErrors.name = newFormValidation.nameValid
          ? ''
          : ' is too short'
        break
      case 'type':
        newFormValidation.typeValid = value.length >= 1
        newFormValidation.formErrors.type = newFormValidation.typeValid
          ? ''
          : ' you must select a monitor type'
        break
      case 'interval':
        newFormValidation.intervalValid = value >= 300
        newFormValidation.formErrors.interval = newFormValidation.intervalValid
          ? ''
          : ' you must select an interval'
        break
      case 'httpUrl':
        newFormValidation.httpUrlValid = isValidUrl(value)
        newFormValidation.formErrors.httpUrl = newFormValidation.httpUrlValid
          ? ''
          : ' you must enter a valid url'
        break
      case 'httpKeyword':
        newFormValidation.httpKeywordValid = value.length >= 1
        newFormValidation.formErrors.httpKeyword =
          newFormValidation.httpKeywordValid ? '' : ' is too short'
        break
      default:
        break
    }

    setFormValidation({
      ...formValidation,
      ...newFormValidation,
    })
  }

  const validateForm = () => {
    if (formValidation.typeValid && monitorInfo.type === 'http') {
      if (
        formValidation.nameValid &&
        formValidation.typeValid &&
        formValidation.intervalValid &&
        formValidation.httpUrlValid
      ) {
        setFormValid(true)
      } else {
        setFormValid(false)
      }
      // validate for when email is chosen
    } else if (formValidation.typeValid && monitorInfo.type === 'keyword') {
      if (
        formValidation.nameValid &&
        formValidation.typeValid &&
        formValidation.intervalValid &&
        formValidation.httpKeywordValid &&
        formValidation.httpUrlValid
      ) {
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

  useEffect(() => {
    validateField('name', monitorInfo['name'])
    validateField('type', monitorInfo['type'])
    validateField('interval', monitorInfo['interval'])
    validateField('httpUrl', monitorInfo.config['httpUrl'])
    validateField('httpKeyword', monitorInfo.config['httpKeyword'])
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Button colorScheme="purple" size="xs" onClick={onOpen}>
        update
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update monitor</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Name"
              isRequired={true}
              value={monitorInfo.name}
              onChange={handleInputChange}
              name="name"
              isInvalid={
                !formValidation.nameValid && formValidation.nameValid !== null
              }
            />
            <FormLabel>Interval</FormLabel>
            <Select
              placeholder="Interval"
              isRequired={true}
              value={monitorInfo.interval}
              onChange={handleInputChange}
              name="interval"
              isInvalid={
                !formValidation.intervalValid &&
                formValidation.intervalValid !== null
              }
            >
              <option value={300}>Every 5 mins</option>
              <option value={600}>Every 10 mins</option>
              <option value={900}>Every 15 mins</option>
              <option value={1800}>Every 30 mins</option>
              <option value={3600}>Every 60 mins</option>
            </Select>{' '}
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Type"
              isRequired={true}
              value={monitorInfo.type}
              onChange={handleInputChange}
              name="type"
              isInvalid={
                !formValidation.typeValid && formValidation.typeValid !== null
              }
            >
              <option value="http">HTTP</option>
              <option value="keyword">HTTP with keyword</option>
            </Select>
            <FormLabel>Url</FormLabel>
            <Input
              type="text"
              placeholder="URL"
              isRequired={true}
              value={monitorInfo.config.httpUrl}
              onChange={handleConfigChange}
              name="httpUrl"
              isInvalid={
                !formValidation.httpUrlValid &&
                formValidation.httpUrlValid !== null
              }
            />
            {monitorInfo.type === 'keyword' && (
              <>
                <FormLabel>Keyword</FormLabel>
                <Input
                  type="text"
                  placeholder="Keyword"
                  isRequired={true}
                  value={monitorInfo.config.httpKeyword}
                  onChange={handleConfigChange}
                  name="httpKeyword"
                  isInvalid={
                    !formValidation.httpKeywordValid &&
                    formValidation.httpKeywordValid !== null
                  }
                />
              </>
            )}
            <FormLabel>Notification Agent(s)</FormLabel>
            {notifications.length > 0 ? null : (
              <div>No notifiers configured</div>
            )}
            {notifications &&
              notifications.map((notification, key) => {
                return (
                  <div key={key}>
                    <Checkbox
                      colorScheme="purple"
                      isChecked={
                        monitorInfo.notifications.find(
                          (element) => element === notification._id
                        )
                          ? true
                          : false
                      }
                      id={notification._id}
                      name={notification.name}
                      onChange={handleNotificationChange}
                    >
                      {notification.name}{' '}
                      {notification.type === 'slack' ? (
                        <FontAwesomeIcon icon={faSlack} />
                      ) : (
                        <FontAwesomeIcon icon={faMailBulk} />
                      )}
                    </Checkbox>
                  </div>
                )
              })}
            <br />
            <FormLabel>Enable</FormLabel>
            <Checkbox
              colorScheme="purple"
              isRequired={true}
              isChecked={monitorInfo.enabled}
              onChange={handleCheckboxChange}
              name="enabled"
            >
              Enable Monitoring
            </Checkbox>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              onClick={handleUpdateMonitor}
              disabled={!formValid}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateMonitor

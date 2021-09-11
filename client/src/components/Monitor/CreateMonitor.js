import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  Button,
  Center,
  Checkbox,
  createStandaloneToast,
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
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlack } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

import { MonitorContext } from '../../contexts/MonitorContext'
import { NotificationContext } from '../../contexts/NotificationContext'

import isValidUrl from '../../util/isValidUrl'

function CreateMonitor() {
  const { createMonitor, loading } = useContext(MonitorContext)
  const { notifications } = useContext(NotificationContext)
  const toast = createStandaloneToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()

  const initMonitorInfo = {
    name: '',
    type: '',
    interval: null,
    enabled: true,
    config: {
      httpUrl: '',
      httpKeyword: '',
    },
    notifications: [],
  }
  let [monitorInfo, setMonitorInfo] = useState(initMonitorInfo)

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCreateMonitor()
    }
  }

  const handleEnableChange = (event) => {
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
        newNotifications = newNotifications.filter(
          (item) => item !== existingNotification
        )
      }
    })

    setMonitorInfo({ ...monitorInfo, notifications: newNotifications })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications])

  const handleClear = () => {
    monitorInfo = setMonitorInfo(initMonitorInfo)
    setFormValidation(initFormValidation)
  }

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
        newFormValidation.intervalValid = value.length >= 1
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

  const handleCreateMonitor = () => {
    if (formValid) {
      createMonitor(monitorInfo, (result) => {
        if (result.status === 'success') {
          const id = 'monitor-created-toast'
          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Monitor created.',
              description: 'Your monitor is now running.',
              status: 'success',
              variant: 'subtle',
              duration: 3000,
              isClosable: true,
            })
          }
          handleClear()
        }
      })
    }
  }

  return (
    <>
      <Button colorScheme="purple" size="sm" onClick={onOpen}>
        Add Monitor
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new monitor</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              type="text"
              placeholder="Name"
              isRequired={true}
              value={monitorInfo.name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              name="name"
              isInvalid={
                !formValidation.nameValid && formValidation.nameValid !== null
              }
            />

            <Center>
              <Select
                placeholder="Interval"
                isRequired={true}
                onChange={handleInputChange}
                name="interval"
                isInvalid={
                  !formValidation.intervalValid &&
                  formValidation.intervalValid !== null
                }
              >
                <option value="300">Every 5 mins</option>
                <option value="600">Every 10 mins</option>
                <option value="900">Every 15 mins</option>
                <option value="1800">Every 30 mins</option>
                <option value="3600">Every 60 mins</option>
              </Select>
            </Center>

            <Center>
              <Select
                placeholder="Type"
                isRequired={true}
                onChange={handleInputChange}
                name="type"
                isInvalid={
                  !formValidation.typeValid && formValidation.typeValid !== null
                }
              >
                <option value="http">HTTP</option>
                <option value="keyword">HTTP with keyword</option>
              </Select>
            </Center>

            <Input
              type="text"
              placeholder="URL"
              isRequired={true}
              value={monitorInfo.config.httpUrl}
              onChange={handleConfigChange}
              onKeyDown={handleKeyDown}
              name="httpUrl"
              isInvalid={
                !formValidation.httpUrlValid &&
                formValidation.httpUrlValid !== null
              }
            />

            {monitorInfo.type === 'keyword' && (
              <Input
                type="text"
                placeholder="Keyword"
                isRequired={true}
                value={monitorInfo.config.httpKeyword}
                onChange={handleConfigChange}
                onKeyDown={handleKeyDown}
                name="httpKeyword"
                isInvalid={
                  !formValidation.httpKeywordValid &&
                  formValidation.httpKeywordValid !== null
                }
              />
            )}

            <div>
              <label htmlFor="notifications">Notification Agent(s)</label>
              {notifications.length > 0 ? null : (
                <div>No notifiers configured</div>
              )}
              {notifications &&
                notifications.map((notification, key) => {
                  return (
                    <div key={key}>
                      <Checkbox
                        colorScheme="purple"
                        checked={monitorInfo.notifications[notification._id]}
                        id={notification._id}
                        name={notification.name}
                        value={notification.name}
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
            </div>

            <br />

            <div className="form-group">
              <Checkbox
                defaultIsChecked
                colorScheme="purple"
                isRequired={true}
                checked={monitorInfo.enabled}
                onChange={handleEnableChange}
                name="enabled"
              >
                Enable Monitoring
              </Checkbox>
            </div>

            <div style={{ marginTop: '10px' }}></div>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleCreateMonitor}
              variant="solid"
              colorScheme="purple"
              isLoading={loading}
              disabled={!formValid}
            >
              Monitor
            </Button>
            <Button onClick={handleClear} variant="ghost" colorScheme="grey">
              Clear
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateMonitor

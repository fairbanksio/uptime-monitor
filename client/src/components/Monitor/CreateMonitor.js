import React, { useState, useContext, useEffect } from 'react'
import {
  Button,
  Center,
  Checkbox,
  createStandaloneToast,
  Input,
  Select,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlack } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

import { MonitorContext } from '../../contexts/MonitorContext'
import { NotificationContext } from '../../contexts/NotificationContext'

function CreateMonitor() {
  const { createMonitor, loading } = useContext(MonitorContext)
  const { notifications } = useContext(NotificationContext)
  const toast = createStandaloneToast()

  let [monitorInfo, setMonitorInfo] = useState({
    name: '',
    type: '',
    interval: null,
    enabled: true,
    config: {
      httpUrl: '',
      httpKeyword: '',
    },
    notifications: [],
  })

  const [invalidName, isInvalidName] = React.useState(null)
  const [invalidType, isInvalidType] = React.useState(null)
  const [invalidInterval, isInvalidInterval] = React.useState(null)
  const [invalidUrl, isInvalidUrl] = React.useState(null)
  const [invalidKeyword, isInvalidKeyword] = React.useState(null)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setMonitorInfo({ ...monitorInfo, [name]: value })
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
    monitorInfo = setMonitorInfo({
      name: '',
      type: '',
      interval: null,
      enabled: true,
      config: {
        httpUrl: '',
        httpKeyword: '',
      },
      notifications: [],
    })
  }

  const verifyForm = () => {
    if (monitorInfo.name && monitorInfo.name.length > 0) {
      isInvalidName(false)
    } else isInvalidName(true)
    if (monitorInfo.interval && monitorInfo.interval.length > 1) {
      isInvalidInterval(false)
    } else isInvalidInterval(true)
    if (monitorInfo.type && monitorInfo.type.length > 0) {
      isInvalidType(false)
    } else isInvalidType(true)
    if (monitorInfo.config.httpUrl && monitorInfo.config.httpUrl.length > 0) {
      isInvalidUrl(false)
    } else isInvalidUrl(true)

    if (
      invalidName === false &&
      invalidType === false &&
      invalidInterval === false &&
      invalidUrl === false
    ) {
      return true
    } else {
      return false
    }
  }

  const handleCreateMonitor = () => {
    if (
      verifyForm() &&
      invalidName === false &&
      invalidType === false &&
      invalidInterval === false &&
      invalidUrl === false
    ) {
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
    } else {
      setTimeout(() => {
        isInvalidName(null)
        isInvalidType(null)
        isInvalidInterval(null)
        isInvalidUrl(null)
        isInvalidKeyword(null)
      }, 1200)
    }
  }

  return (
    <div>
      <Input
        type="text"
        placeholder="Name"
        isRequired={true}
        value={monitorInfo.name}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        name="name"
        isInvalid={invalidName}
      />

      <Center>
        <Select
          placeholder="Interval"
          isRequired={true}
          onChange={handleInputChange}
          name="interval"
          isInvalid={invalidInterval}
        >
          <option value="60">Every minute</option>
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
          isInvalid={invalidType}
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
        isInvalid={invalidUrl}
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
          isInvalid={invalidKeyword}
        />
      )}

      <div>
        <label htmlFor="notifications">Notification Agent(s)</label>
        {notifications.length > 0 ? null : <div>No notifiers configured</div>}
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

      <div style={{ marginTop: '10px' }}>
        <Button
          onClick={handleCreateMonitor}
          variant="solid"
          colorScheme="purple"
          isLoading={loading}
        >
          Monitor
        </Button>
        <Button onClick={handleClear} variant="ghost" colorScheme="grey">
          Clear
        </Button>
      </div>
    </div>
  )
}

export default CreateMonitor

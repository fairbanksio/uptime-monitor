import React, { useState, useContext, useEffect } from 'react'
import { Button, Input, Checkbox } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlack } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

import { MonitorContext } from '../../contexts/MonitorContext'
import { NotificationContext } from '../../contexts/NotificationContext'

function CreateMonitor() {
  const { createMonitor } = useContext(MonitorContext)
  const { notifications } = useContext(NotificationContext)
  const [monitorInfo, setMonitorInfo] = useState({
    name: '',
    type: 'http',
    interval: 60,
    enabled: true,
    config: {
      httpUrl: '',
    },
    notifications: [],
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setMonitorInfo({ ...monitorInfo, [name]: value })
  }

  const handleEnableChange = (event) => {
    const { name, checked } = event.target
    setMonitorInfo({ ...monitorInfo, [name]: checked })
  }

  const handleConfigChange = (event) => {
    const { name, value } = event.target
    setMonitorInfo({ ...monitorInfo, config: { [name]: value } })
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

  const handleCreateMonitor = () => {
    createMonitor(monitorInfo, (result) => {
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
            value={monitorInfo.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <Input
            type="number"
            placeholder="Interval"
            required
            disabled
            value={monitorInfo.interval}
            onChange={handleInputChange}
            name="interval"
          />
        </div>

        <div className="form-group">
          <Input
            type="text"
            placeholder="URL"
            required
            value={monitorInfo.config.httpUrl}
            onChange={handleConfigChange}
            name="httpUrl"
          />
        </div>

        <div>
          <label htmlFor="notifications">Notification Agent(s)</label>
          {notifications.length > 0 ? null : (
            <div>You must create a notification first</div>
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
            required
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
          >
            Monitor
          </Button>
          <Button variant="ghost" colorScheme="grey" mr={3}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateMonitor

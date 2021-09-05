import React, { useState, useContext, useEffect } from 'react'
import { Button, Center, Checkbox, Input, Select } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlack } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

import { MonitorContext } from '../../contexts/MonitorContext'
import { NotificationContext } from '../../contexts/NotificationContext'

function UpdateMonitor(props) {
  const { updateMonitor } = useContext(MonitorContext)
  const { notifications } = useContext(NotificationContext)
  const { monitor } = props
  const [monitorInfo, setMonitorInfo] = useState(monitor)
  const [visible, setVisible] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setMonitorInfo({ ...monitorInfo, [name]: value })
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
  }

  const handleUpdateMonitor = () => {
    updateMonitor(monitorInfo, (result) => {
      if (result.status === 'success') {
        //history.push("/")
      }
    })
    setVisible(false)
  }

  const toggleVisible = () => {
    setVisible(!visible)
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
          value={monitorInfo.name}
          onChange={handleInputChange}
          name="name"
          width={250}
        />
        <Center>
          <Select
            placeholder="Interval"
            isRequired={true}
            value={monitorInfo.interval}
            onChange={handleInputChange}
            name="interval"
            width={250}
          >
            <option value="300">Every 5 mins</option>
            <option value="600">Every 10 mins</option>
            <option value="900">Every 15 mins</option>
            <option value="1800">Every 30 mins</option>
            <option value="3600">Every 60 mins</option>
          </Select>{' '}
        </Center>

        <Center>
          <Select
            placeholder="Type"
            isRequired={true}
            value={monitorInfo.type}
            onChange={handleInputChange}
            name="type"
            width={250}
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
          name="httpUrl"
          width={250}
        />
        <br />
        <Input
          type="text"
          placeholder="Keyword"
          isRequired={true}
          value={monitorInfo.config.httpKeyword}
          onChange={handleConfigChange}
          name="httpKeyword"
          width={250}
        />

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
                    defaultValue={notification.name}
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
            onChange={handleCheckboxChange}
            name="enabled"
          >
            Enable Monitoring
          </Checkbox>
        </div>

        <Button colorScheme="purple" size="xs" onClick={handleUpdateMonitor}>
          update
        </Button>
      </div>
    )
  }
}

export default UpdateMonitor

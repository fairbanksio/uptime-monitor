import React, { useState, useContext, useEffect } from 'react'

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
    setMonitorInfo({ ...monitorInfo, config: { [name]: value } })
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
      <button onClick={toggleVisible} className="btn btn-success">
        Update
      </button>
    )
  } else {
    return (
      <div>
        <div className="submit-form">
          <h2>Update a monitor</h2>
          <div>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                required
                value={monitorInfo.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">interval</label>
              <input
                type="number"
                className="form-control"
                required
                value={monitorInfo.interval}
                onChange={handleInputChange}
                name="interval"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">enabled</label>
              <input
                type="checkbox"
                className="form-control"
                required
                checked={monitorInfo.enabled}
                onChange={handleCheckboxChange}
                name="enabled"
              />
            </div>

            <div className="form-group">
              <label htmlFor="httpUrl">httpUrl</label>
              <input
                type="text"
                className="form-control"
                required
                value={monitorInfo.config.httpUrl}
                onChange={handleConfigChange}
                name="httpUrl"
              />
            </div>

            <div>
              <label htmlFor="notifications">Notification</label>
              {notifications.length > 0 ? null : (
                <div>You must create a notification first</div>
              )}
              {notifications &&
                notifications.map((notification, key) => {
                  return (
                    <div key={key}>
                      <label htmlFor="vehicle2">
                        {' '}
                        {notification.name}({notification.type})
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        checked={
                          monitorInfo.notifications.find(
                            (element) => element === notification._id
                          )
                            ? true
                            : false
                        }
                        id={notification._id}
                        name={notification.name}
                        value={notification.name}
                        onChange={handleNotificationChange}
                      />
                    </div>
                  )
                })}
            </div>

            <button onClick={handleUpdateMonitor} className="btn btn-success">
              Update Monitor
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateMonitor

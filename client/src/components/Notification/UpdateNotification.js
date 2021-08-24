import React, { useState, useContext } from 'react'

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
      <button onClick={toggleVisible} className="btn btn-success">
        Update
      </button>
    )
  } else {
    return (
      <div>
        <div className="submit-form">
          <h2>Update a notification</h2>
          <div>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                required
                value={notificationInfo.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">type</label>
              <input
                type="text"
                className="form-control"
                required
                value={notificationInfo.type}
                onChange={handleInputChange}
                name="type"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slackWebhook">slackWebhook</label>
              <input
                type="text"
                className="form-control"
                required
                value={notificationInfo.config.slackWebhook}
                onChange={handleConfigChange}
                name="slackWebhook"
              />
            </div>

            <button
              onClick={handleUpdateNotification}
              className="btn btn-success"
            >
              Update Notification
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateNotification

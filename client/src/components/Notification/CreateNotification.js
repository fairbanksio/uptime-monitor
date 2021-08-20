import React, { useState, useContext } from "react";

import {NotificationContext} from '../../contexts/NotificationContext'

function CreateNotification() {
  const {createNotification} = useContext(NotificationContext)

  const [notificationInfo, setNotificationInfo] = useState({
    name: "",
    type: "slack",
    config: { 
      slackWebhook: ""
    }
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNotificationInfo({ ...notificationInfo, [name]: value });
  };

  const handleConfigChange = event => {
    const { name, value } = event.target;
    setNotificationInfo({ ...notificationInfo, config: {[name]: value }});
  };

  const handleCreateNotification = () => {
    createNotification(notificationInfo)
  };

  return (
    <div className="submit-form">
      <h2>Create a notification</h2>
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

          <button onClick={handleCreateNotification} className="btn btn-success">
            Create Notification
          </button>

        </div>
    </div>

  );
}

export default CreateNotification;
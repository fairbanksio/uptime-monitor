import React, { useState, useContext } from "react";

import {MonitorContext} from '../../contexts/MonitorContext'
import {NotificationContext} from '../../contexts/NotificationContext'

function CreateMonitor() {
  const {createMonitor} = useContext(MonitorContext)
  const {notifications} = useContext(NotificationContext)
  const [monitorInfo, setMonitorInfo] = useState({
    name: "",
    type: "http",
    interval: 60,
    enabled: true,
    config: { 
      httpUrl: ""
    },
    notifications: ""
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMonitorInfo({ ...monitorInfo, [name]: value });
  };

  const handleCheckboxChange = event => {
    const { name, checked } = event.target;
    setMonitorInfo({ ...monitorInfo, [name]: checked });
  };

  const handleConfigChange = event => {
    const { name, value } = event.target;
    setMonitorInfo({ ...monitorInfo, config: {[name]: value }});
  };

  const handleCreateMonitor = () => {
    createMonitor(monitorInfo, result => {
      if(result.status === "success"){
        //history.push("/")
      }
    })
  };

  return (
    <div className="submit-form">
      <h2>Create a monitor</h2>
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
              onChange={handleCheckboxChange }
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
            <select name="notifications" value={monitorInfo.notification} onChange={handleInputChange} onSelect={handleInputChange}>
              {notifications.map((notification, key) => {
                  return <option key={key} value={notification._id}>{notification.name}</option>
              })}
            </select>
          </div>

          <button onClick={handleCreateMonitor} className="btn btn-success">
            Create Monitor
          </button>

        </div>
    </div>

  );
}

export default CreateMonitor;
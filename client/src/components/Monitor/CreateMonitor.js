import React, { useState, useContext, useEffect } from "react";

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
    notifications: []
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setMonitorInfo({ ...monitorInfo, [name]: value });
  };

  const handleEnableChange = event => {
    const { name, checked } = event.target;
    setMonitorInfo({ ...monitorInfo, [name]: checked });
  };

  const handleConfigChange = event => {
    const { name, value } = event.target;
    setMonitorInfo({ ...monitorInfo, config: {[name]: value }});
  };

  const handleNotificationChange = event => {
    const { id, checked } = event.target;
    let newNotifications = monitorInfo.notifications
    
    if(checked){
      newNotifications.push(id)
    } else {
      newNotifications = newNotifications.filter(item => item !== id)
    }

    setMonitorInfo({ ...monitorInfo, notifications: newNotifications});
    
  };

  useEffect(() => {
    let newNotifications = monitorInfo.notifications
    for (var i = 0; i < monitorInfo.notifications.length; i++) {
      let found = false
      for (var x = 0; x < notifications.length; x++) {
        if(found !== true){
          if(notifications[x]._id === monitorInfo.notifications[i]){
            found = true
          }
        }     
      }
      if(!found){
        // define new notifications as existing notifications where the item is not equal to our current item
        newNotifications = newNotifications.filter(item => item !== monitorInfo.notifications[i])
      }
    }

    setMonitorInfo({ ...monitorInfo, notifications: newNotifications});
  }, [notifications]);

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
              onChange={handleEnableChange }
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
              {notifications.length > 0? <div>Check notifications to enable them for this monitor:</div> : <div>You must create a notification first</div>}
              {notifications && notifications.map((notification, key) => {
                return(
                  <div key={key}>
                    <label htmlFor="vehicle2"> {notification.name}({notification.type})</label><br/>
                    <input type="checkbox" checked={monitorInfo.notifications[notification._id]} id={notification._id} name={notification.name} value={notification.name} onChange={handleNotificationChange}/>
                  </div>
                )
              })}
   
          </div>

          <button onClick={handleCreateMonitor} className="btn btn-success">
            Create Monitor
          </button>

        </div>
    </div>

  );
}

export default CreateMonitor;
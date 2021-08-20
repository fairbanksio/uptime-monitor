import React, { useContext } from "react";

import {MonitorContext} from '../../contexts/MonitorContext'

function MonitorEvents(monitor) {
  console.log(monitor)
  const {monitors} = useContext(MonitorContext)
  const thisMonitor = monitors.filter(function (el) {
    return el._id === monitor.monitor._id
  })[0]
  const heartbeats = thisMonitor.heartbeats
  return (
      <div >
        Heartbeats:
          <div>
          {heartbeats.map((event, key) => (
              <div key={key}>Status: {event.type}, StatusMessage: {event.statusMessage}</div>
          ))}

          </div>
      </div>

    );
}

export default MonitorEvents;
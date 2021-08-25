import React, { useContext } from 'react'

import { MonitorContext } from '../../contexts/MonitorContext'

function MonitorHeartbeats(monitor) {
  const { monitors } = useContext(MonitorContext)
  const thisMonitor = monitors.filter(function (el) {
    return el._id === monitor.monitor._id
  })[0]
  const heartbeats = thisMonitor.heartbeats
  return (
    <div>
      Heartbeats:
      <div>
        {heartbeats.map((heartbeat, key) => (
          <div key={key}>
            Status: {heartbeat.status}, ResponseTime: {heartbeat.responseTime}ms,
            StatusMessage: {heartbeat.statusMessage}, Timestamp: {heartbeat.createdAt},
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonitorHeartbeats

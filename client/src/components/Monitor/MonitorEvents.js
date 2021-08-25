import React, { useContext } from 'react'

import { MonitorContext } from '../../contexts/MonitorContext'

function MonitorEvents(monitor) {
  const { monitors } = useContext(MonitorContext)
  const thisMonitor = monitors.filter(function (el) {
    return el._id === monitor.monitor._id
  })[0]
  const events = thisMonitor.events
  return (
    <div>
      Events:
      <div>
        {events.map((event, key) => (
          <div key={key}>
            Type: {event.type}, Started: {event.createdAt}, Message: {event.message}, Duration: {event.duration}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonitorEvents

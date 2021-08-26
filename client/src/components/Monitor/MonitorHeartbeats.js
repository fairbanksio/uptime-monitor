import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimesCircle,
  faCheckCircle,
} from '@fortawesome/free-regular-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

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
            {heartbeat.status === 'UP' ? (
              <FontAwesomeIcon icon={faCircle} style={{ color: 'green' }} />
            ) : (
              <FontAwesomeIcon icon={faCircle} style={{ color: 'red' }} />
            )}{' '}
            ResponseTime: {heartbeat.responseTime}ms || StatusMessage:{' '}
            {heartbeat.statusMessage} || Timestamp: {heartbeat.createdAt}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonitorHeartbeats

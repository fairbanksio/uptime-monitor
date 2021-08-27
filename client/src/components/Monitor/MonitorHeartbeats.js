import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment-timezone'

import { MonitorContext } from '../../contexts/MonitorContext'

function MonitorHeartbeats(monitor) {
  const { monitors } = useContext(MonitorContext)
  const thisMonitor = monitors.filter(function (el) {
    return el._id === monitor.monitor._id
  })[0]
  const heartbeats = thisMonitor.heartbeats
  return (
    <div style={{ maxHeight: 200, overflowX: 'auto' }}>
      {heartbeats.length > 0 ? (
        heartbeats.map((heartbeat, key) => (
          <div key={key}>
            {heartbeat.status === 'UP' ? (
              <FontAwesomeIcon icon={faCircle} style={{ color: 'green' }} />
            ) : (
              <FontAwesomeIcon icon={faCircle} style={{ color: 'red' }} />
            )}{' '}
            {moment(heartbeat.createdAt).fromNow()}
            <pre style={{ float: '' }}>
              {heartbeat.statusMessage + ' in ' + heartbeat.responseTime + 'ms'}
            </pre>{' '}
          </div>
        ))
      ) : (
        <div>No recent heartbeats</div>
      )}
    </div>
  )
}

export default MonitorHeartbeats

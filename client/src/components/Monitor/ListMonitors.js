import React, { useContext } from 'react'
import DeleteMonitor from './DeleteMonitor'
import UpdateMonitor from './UpdateMonitor'
import MonitorEvents from './MonitorEvents'
import MonitorHeartbeats from './MonitorHeartbeats'
import { MonitorContext } from '../../contexts/MonitorContext'

function ListMonitors() {
  const { monitors } = useContext(MonitorContext)
  return (
    <div>
      <h2>Monitors List:</h2>
      {monitors.map((monitor, key) => (
        <div key={key}>
          <div className="user">
            name: {monitor.name}, enabled: {monitor.enabled ? 'true' : 'false'},
            type: {monitor.type}, interval: {monitor.interval}, config:{' '}
            {JSON.stringify(monitor.config)}, notifications:{' '}
            {JSON.stringify(monitor.notifications)},
            status: {monitor.status}
            <DeleteMonitor monitorId={monitor._id} />
            <UpdateMonitor monitor={monitor} />
          </div>
          <MonitorEvents monitor={monitor} />
          <MonitorHeartbeats monitor={monitor} />
        </div>
      ))}
    </div>
  )
}

export default ListMonitors

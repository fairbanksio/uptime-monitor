import React, { useContext } from 'react'
import { Text } from '@chakra-ui/react'

import DeleteMonitor from './DeleteMonitor'
import UpdateMonitor from './UpdateMonitor'
import MonitorEvents from './MonitorEvents'
import MonitorHeartbeats from './MonitorHeartbeats'
import { MonitorContext } from '../../contexts/MonitorContext'

function ListMonitors() {
  const { monitors } = useContext(MonitorContext)
  return (
    <div>
      {monitors.map((monitor, key) => (
        <div key={key}>
          <div>
            <Text fontSize="2xl">{monitor.name}</Text>
            <UpdateMonitor monitor={monitor} />{' '}
            <DeleteMonitor monitorId={monitor._id} />
          </div>
          <MonitorHeartbeats monitor={monitor} />
          <MonitorEvents monitor={monitor} />
          <br />
        </div>
      ))}
    </div>
  )
}

export default ListMonitors

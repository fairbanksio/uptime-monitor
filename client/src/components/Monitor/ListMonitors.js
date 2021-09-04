import React, { useContext } from 'react'
import { Box, Grid, Text } from '@chakra-ui/react'

import DeleteMonitor from './DeleteMonitor'
import UpdateMonitor from './UpdateMonitor'
import MonitorEvents from './MonitorEvents'
import MonitorHeartbeats from './MonitorHeartbeats'

import { MonitorContext } from '../../contexts/MonitorContext'
import LatencyChart from '../Graph/LatencyChart'

function ListMonitors() {
  const { monitors } = useContext(MonitorContext)
  return (
    <div>
      {monitors.length > 0 ? (
        monitors.map((monitor, key) => (
          <div key={key}>
            <div>
              <Text fontSize="2xl">{monitor.name}</Text>
              <a
                href={monitor.config.httpUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text fontSize="sm" style={{ marginBottom: '5px' }}>
                  {monitor.config.httpUrl}
                </Text>
              </a>
              <UpdateMonitor monitor={monitor} />{' '}
              <DeleteMonitor monitorId={monitor._id} />
            </div>

            <div>
              <LatencyChart monitor={monitor} />
            </div>

            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Box w="100%">
                <Text fontSize="lg">Events</Text>
                <MonitorEvents monitor={monitor} />
              </Box>
              <Box w="100%">
                <Text fontSize="lg">Heartbeats</Text>
                <MonitorHeartbeats monitor={monitor} />
              </Box>
            </Grid>
            <br />
          </div>
        ))
      ) : (
        <div>No monitors configured</div>
      )}
    </div>
  )
}

export default ListMonitors

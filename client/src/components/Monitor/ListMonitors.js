import React, { useContext } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  Text,
} from '@chakra-ui/react'

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
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem key={key}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <div>
                      <Text fontSize="2xl">{monitor.name}</Text>
                      <div style={{ display: 'inline-block' }}>
                        <a
                          href={monitor.config.httpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Text fontSize="sm" style={{ marginBottom: '5px' }}>
                            {monitor.config.httpUrl}
                          </Text>
                        </a>
                      </div>
                      <br />
                      <UpdateMonitor monitor={monitor} />{' '}
                      <DeleteMonitor monitorId={monitor._id} />
                    </div>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div key={key}>
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
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))
      ) : (
        <div>
          <Text>No monitors configured</Text>
        </div>
      )}
    </div>
  )
}

export default ListMonitors

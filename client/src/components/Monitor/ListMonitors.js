import React, { useContext } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  Link,
  Text,
} from '@chakra-ui/react'

import DeleteMonitor from './DeleteMonitor'
import UpdateMonitor from './UpdateMonitor'
import MonitorEvents from './MonitorEvents'
import MonitorHeartbeats from './MonitorHeartbeats'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

import { MonitorContext } from '../../contexts/MonitorContext'
import LatencyChart from '../Graph/LatencyChart'

function ListMonitors() {
  const { monitors } = useContext(MonitorContext)

  return (
    <div>
      {monitors.length > 0 ? (
        <Accordion allowMultiple>
          {monitors.map((monitor, key) => (
            <AccordionItem key={key}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Grid
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(10, 1fr)"
                  >
                    <GridItem
                      rowSpan={2}
                      colSpan={1}
                      style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: '20px',
                      }}
                    >
                      {monitor.status === 'UP' ? (
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          size="2x"
                          style={{ color: 'green' }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          size="2x"
                          style={{ color: 'red' }}
                        />
                      )}
                    </GridItem>
                    <GridItem colSpan={9}>
                      <Text fontSize="2xl">{monitor.name}</Text>
                    </GridItem>
                    <GridItem colSpan={5}>
                      <div style={{ display: 'inline-block' }}>
                        <a
                          href={monitor.config.httpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Link fontSize="sm" style={{ color: 'grey' }}>
                            {monitor.config.httpUrl}
                          </Link>
                        </a>
                      </div>
                    </GridItem>
                    <GridItem colSpan={4} />
                  </Grid>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <LatencyChart monitor={monitor} />
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
                {/* <Button
                  size="xs"
                  colorScheme="purple"
                  onClick={(e) => refreshMonitors(() => {})}
                >
                  refresh
                </Button>{' '} */}
                <UpdateMonitor monitor={monitor} />{' '}
                <DeleteMonitor monitorId={monitor._id} />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div>
          <Text>No monitors configured</Text>
        </div>
      )}
    </div>
  )
}

export default ListMonitors

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
  Button,
} from '@chakra-ui/react'

import DeleteMonitor from './DeleteMonitor'
import UpdateMonitor from './UpdateMonitor'
import MonitorEvents from './MonitorEvents'
import MonitorHeartbeats from './MonitorHeartbeats'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUp,
  faArrowDown,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'

import { MonitorContext } from '../../contexts/MonitorContext'
import LatencyChart from '../Graph/LatencyChart'

function ListMonitors() {
  const { monitors, refreshMonitors } = useContext(MonitorContext)

  return (
    <div>
      {monitors.length > 0 ? (
        <Accordion allowMultiple>
          {monitors.map((monitor, key) => (
            <AccordionItem key={key}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">

                    <Text fontSize="2xl">{monitor.name} 
                    {monitor.status === "UP" ?
                      <FontAwesomeIcon
                        icon={faArrowUp}
                        style={{ color: 'green', marginLeft: '7px' }}
                      />
                    :
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        style={{ color: 'red', marginLeft: '7px' }}
                      />
                    }
                    
                    </Text>
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
                <UpdateMonitor monitor={monitor} />{' '}
                <DeleteMonitor monitorId={monitor._id} />
              </AccordionPanel>
            </AccordionItem>
          ))}
          <Button onClick={(e) => refreshMonitors(()=>{})} colorScheme="purple" >Refresh</Button>
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

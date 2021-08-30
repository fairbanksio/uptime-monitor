import React, { useContext } from 'react'
import {
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment-timezone'

import { MonitorContext } from '../../contexts/MonitorContext'

function MonitorHeartbeats(monitor) {
  const { monitors } = useContext(MonitorContext)
  const thisMonitor = monitors.filter(function (el) {
    return el._id === monitor.monitor._id
  })[0]
  const heartbeats = thisMonitor.heartbeats
  return (
    <Table size="sm" variant="simple">
      <Thead>
        <Tr>
          <Th>Status</Th>
          <Th>Time</Th>
          <Th>Status Message</Th>
          <Th isNumeric style={{ width: '150px' }}>
            Response Time
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {heartbeats.length > 0 ? (
          heartbeats.map((heartbeat, key) => (
            <Tr key={key}>
              <Td style={{ paddingLeft: '27px', width: '15px' }}>
                {heartbeat.status === 'UP' ? (
                  <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                )}
              </Td>
              <Td style={{ fontSize: '12px' }}>
                {moment(heartbeat.createdAt).fromNow()}
              </Td>
              <Td>
                <code>{heartbeat.statusMessage}</code>
              </Td>
              <Td style={{ fontSize: '12px' }}>
                <Center>{heartbeat.responseTime} ms</Center>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr key={'no-recent-heartbeats'}>
            <Td colspan="4">
              <Center>No recent heartbeats</Center>
            </Td>
          </Tr>
        )}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Status</Th>
          <Th>Time</Th>
          <Th>Status Message</Th>
          <Th isNumeric>Response Time</Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}

export default MonitorHeartbeats

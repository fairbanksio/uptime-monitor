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
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment-timezone'

import { MonitorContext } from '../../contexts/MonitorContext'

function splitDuration(duration) {
  let hr, min, sec, formattedDuration
  try {
    duration = duration.split(':')
  } catch (_err) {
    console.log('Invalid time duration: ' + duration)
    duration = 'unknown'
  }

  if (duration.length === 0) {
    console.log('Invalid time duration: ' + duration)
    return (duration = 'unknown')
  }

  hr = Number(duration[0])
  if (hr === 0) {
    hr = ''
  } else {
    hr = hr + 'h '
  }

  min = Number(duration[1])
  if (min === 0) {
    min = '0m '
  } else {
    min = min + 'm '
  }

  sec = Number(duration[2])
  if (sec === 0) {
    sec = '0s'
  } else {
    sec = sec + 's'
  }

  formattedDuration = hr + min + sec
  return formattedDuration
}

function MonitorEvents(monitor) {
  const { monitors } = useContext(MonitorContext)
  const thisMonitor = monitors.filter(function (el) {
    return el._id === monitor.monitor._id
  })[0]
  const events = thisMonitor.events
  const userTZ = moment.tz.guess(true) // If set to true, caching will be ignored and overwritten with the new value.
  return (
    <Table size="sm" variant="simple">
      <Thead>
        <Tr>
          <Th>Type</Th>
          <Th>Timestamp</Th>
          <Th>Status</Th>
          <Th style={{ width: '150px' }}>Event Duration</Th>
        </Tr>
      </Thead>
      <Tbody>
        {events.length > 0 ? (
          events.map((event, key) => (
            <Tr key={key}>
              <Td style={{ paddingLeft: '20px' }}>
                {event.type && event.type === 'UP' ? (
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    style={{ color: 'green' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    style={{ color: 'red' }}
                  />
                )}
              </Td>
              <Td style={{ fontSize: '12px', width: '175px' }}>
                {moment(event.createdAt).tz(userTZ).format('MMM Do, h:mm:ss a')}
              </Td>
              <Td>
                <code>{event.message}</code>
              </Td>
              <Td style={{ fontSize: '12px' }}>
                {splitDuration(event.duration)}
              </Td>
            </Tr>
          ))
        ) : (
          <Tr key={'no-recent-events'}>
            <Td colspan="4">
              <Center>No recent events</Center>
            </Td>
          </Tr>
        )}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Type</Th>
          <Th>Timestamp</Th>
          <Th>Status</Th>
          <Th>Event Duration</Th>
        </Tr>
      </Tfoot>
      {/* <TableCaption>Recently Detected Events</TableCaption> */}
    </Table>
  )
}

export default MonitorEvents

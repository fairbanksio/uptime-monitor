import React, { useContext } from 'react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
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
  min = Number(duration[1])
  sec = Number(duration[2])

  if (hr === 0) {
    hr = ''
  } else if (hr === 1) {
    hr = hr + ' hr, '
  } else {
    hr = hr + ' hrs, '
  }

  if (min === 0) {
    min = '0 min '
  } else if (min === 1) {
    min = min + ' min,'
  } else {
    min = min + ' mins, '
  }

  if (sec === 1) {
    sec = sec + ' sec'
  } else {
    sec = sec + ' secs'
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
          <Th>Event Timestamp</Th>
          <Th>Status</Th>
          <Th>Event Duration</Th>
        </Tr>
      </Thead>
      <Tbody>
        {events.length > 0 ? (
          events.map((event, key) => (
            <Tr key={key}>
              <Td>
                {event.type && event.type === 'UP' ? (
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    style={{ color: 'green' }}
                    size="2x"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{ color: 'red' }}
                    size="2x"
                  />
                )}
              </Td>
              <Td>
                {moment(event.createdAt)
                  .tz(userTZ)
                  .format('MMMM Do YYYY, h:mm:ss a')}
              </Td>
              <Td>
                <pre>{event.message}</pre>
              </Td>
              <Td>{splitDuration(event.duration)}</Td>
            </Tr>
          ))
        ) : (
          <Tr key={'no-recent-events'}>
            <Td colspan="4">No recent events</Td>
          </Tr>
        )}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Type</Th>
          <Th>Event Timestamp</Th>
          <Th>Status</Th>
          <Th>Event Duration</Th>
        </Tr>
      </Tfoot>
      {/* <TableCaption>Recently Detected Events</TableCaption> */}
    </Table>
  )
}

export default MonitorEvents

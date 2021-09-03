import React, { useContext } from 'react'
import {
  Center,
  Select,
  Table,
  Text,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  chakra,
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy, usePagination } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUp,
  faArrowDown,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
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
    min = ''
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

  const userTZ = moment.tz.guess(true) // If set to true, caching will be ignored and overwritten with the new value.
  const data = thisMonitor.events
  const columns = React.useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'type',
        minWidth: 50,
        maxWidth: 60,
        width: 60,
        Cell: (cellProps) => {
          if (cellProps.value === 'UP') {
            return (
              <FontAwesomeIcon
                icon={faArrowUp}
                style={{ color: 'green', marginLeft: '7px' }}
              />
            )
          } else {
            return (
              <FontAwesomeIcon
                icon={faArrowDown}
                style={{ color: 'red', marginLeft: '7px' }}
              />
            )
          }
        },
      },
      {
        Header: 'Timestamp',
        accessor: 'createdAt',
        minWidth: 100,
        maxWidth: 120,
        width: 120,
        Cell: (cellProps) => {
          return (
            <Text fontSize="xs">
              {moment(cellProps.value).tz(userTZ).format('MMM Do, h:mm:ss a')}
            </Text>
          )
        },
      },
      {
        Header: 'Status',
        accessor: 'message',
        minWidth: 100,
        maxWidth: 120,
        width: 120,
        Cell: (cellProps) => {
          return <code>{cellProps.value}</code>
        },
      },
      {
        Header: 'Event Duration',
        accessor: 'duration',
        isNumeric: true,
        Cell: (cellProps) => {
          return (
            <Center>
              <Text fontSize="xs">{splitDuration(cellProps.value)}</Text>
            </Center>
          )
        },
      },
    ],
    [userTZ]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  )

  return (
    <div>
      <Table {...getTableProps()} size="sm" variant="simple">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                  style={{
                    maxWidth: column.maxWidth,
                    minWidth: column.minWidth,
                    width: column.width,
                  }}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page && page.length > 0 ? (
            page.map((row, key) => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()} key={key}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              )
            })
          ) : (
            <Tr key={'no-recent-events'}>
              <Td colspan="4">
                <Center>No recent events</Center>
              </Td>
            </Tr>
          )}
        </Tbody>
        <Tfoot>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>
      <br />
      {page && page.length > 0 ? (
        <div className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              size="lg"
              style={{ color: '#6B46C1' }}
            />
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <FontAwesomeIcon
              icon={faAngleRight}
              size="lg"
              style={{ color: '#6B46C1' }}
            />
          </button>{' '}
          <div style={{ width: '100px', float: 'right' }}>
            <Select
              size="xs"
              variant="flushed"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[5, 10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MonitorEvents

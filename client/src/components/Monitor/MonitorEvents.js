import React, { useContext } from 'react'
import {
  Center,
  Input,
  Select,
  Table,
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
        Cell: (cellProps) => {
          if (cellProps.value === 'UP') {
            return (
              <FontAwesomeIcon
                {...cellProps}
                icon={faArrowUp}
                style={{ color: 'green', marginLeft: '7px' }}
              />
            )
          } else {
            return (
              <FontAwesomeIcon
                {...cellProps}
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
        Cell: (cellProps) => {
          return moment(cellProps.value).tz(userTZ).format('MMM Do, h:mm:ss a')
        },
      },
      {
        Header: 'Status',
        accessor: 'message',
        Cell: (cellProps) => {
          return <code>{cellProps.value}</code>
        },
      },
      {
        Header: 'Event Duration',
        accessor: 'duration',
        isNumeric: true,
        Cell: (cellProps) => {
          return <Center>{splitDuration(cellProps.value)}</Center>
        },
      },
    ],
    []
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
    pageCount,
    gotoPage,
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
          {page.map((row, key) => {
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
          })}
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
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <Input
            type="number"
            size="xs"
            placeholder="page"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '50px' }}
          />
        </span>
        <div style={{ width: '100px', float: 'right' }}>
          <Select
            size="xs"
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
    </div>
  )

  // return (
  //   <Table size="sm" variant="simple">
  //     <Thead>
  //       <Tr>
  //         <Th>Type</Th>
  //         <Th>Timestamp</Th>
  //         <Th>Status</Th>
  //         <Th style={{ width: '150px' }}>Event Duration</Th>
  //       </Tr>
  //     </Thead>
  //     <Tbody>
  //       {events.length > 0 ? (
  //         events.map((event, key) => (
  //           <Tr key={key}>
  //             <Td style={{ paddingLeft: '20px' }}>
  //               {event.type && event.type === 'UP' ? (
  //                 <FontAwesomeIcon
  //                   icon={faArrowUp}
  //                   style={{ color: 'green' }}
  //                 />
  //               ) : (
  //                 <FontAwesomeIcon
  //                   icon={faArrowDown}
  //                   style={{ color: 'red' }}
  //                 />
  //               )}
  //             </Td>
  //             <Td style={{ fontSize: '12px', width: '175px' }}>
  //               {moment(event.createdAt).tz(userTZ).format('MMM Do, h:mm:ss a')}
  //             </Td>
  //             <Td>
  //               <code>{event.message}</code>
  //             </Td>
  //             <Td style={{ fontSize: '12px' }}>
  //               {splitDuration(event.duration)}
  //             </Td>
  //           </Tr>
  //         ))
  //       ) : (
  //         <Tr key={'no-recent-events'}>
  //           <Td colspan="4">
  //             <Center>No recent events</Center>
  //           </Td>
  //         </Tr>
  //       )}
  //     </Tbody>
  //     <Tfoot>
  //       <Tr>
  //         <Th>Type</Th>
  //         <Th>Timestamp</Th>
  //         <Th>Status</Th>
  //         <Th>Event Duration</Th>
  //       </Tr>
  //     </Tfoot>
  //     {/* <TableCaption>Recently Detected Events</TableCaption> */}
  //   </Table>
  // )
}

export default MonitorEvents

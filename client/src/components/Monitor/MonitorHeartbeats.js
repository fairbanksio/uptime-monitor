import React, { useContext } from 'react'
import {
  Center,
  Input,
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
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment-timezone'

import { MonitorContext } from '../../contexts/MonitorContext'

function MonitorHeartbeats(monitor) {
  const { monitors } = useContext(MonitorContext)
  const thisMonitor = monitors.filter(function (el) {
    return el._id === monitor.monitor._id
  })[0]

  const data = thisMonitor.heartbeats
  const columns = React.useMemo(
    () => [
      {
        Header: 'Status',
        accessor: 'status',
        Cell: (cellProps) => {
          if (cellProps.value === 'UP') {
            return (
              <FontAwesomeIcon
                {...cellProps}
                icon={faCheck}
                style={{ color: 'green', marginLeft: '10px' }}
              />
            )
          } else {
            return (
              <FontAwesomeIcon
                {...cellProps}
                icon={faTimes}
                style={{ color: 'red', marginLeft: '10px' }}
              />
            )
          }
        },
      },
      {
        Header: 'Time',
        accessor: 'createdAt',
        Cell: (cellProps) => {
          return <Text fontSize="xs">{moment(cellProps.value).fromNow()}</Text>
        },
      },
      {
        Header: 'Status Message',
        accessor: 'statusMessage',
        Cell: (cellProps) => {
          return <code>{cellProps.value}</code>
        },
      },
      {
        Header: 'Response Time',
        accessor: 'responseTime',
        isNumeric: true,
        Cell: (cellProps) => {
          return (
            <Center>
              <Text fontSize="xs">{cellProps.value} ms</Text>
            </Center>
          )
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
            <Tr key={'no-recent-heartbeats'}>
              <Td colspan="4">
                <Center>No recent heartbeats</Center>
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
            style={{ width: '40px' }}
          />
        </span>
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
    </div>
  )
}

export default MonitorHeartbeats

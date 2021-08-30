import React, { useContext } from 'react'
import { Button } from '@chakra-ui/react'

import { MonitorContext } from '../../contexts/MonitorContext'

function DeleteMonitor(props) {
  const { deleteMonitor } = useContext(MonitorContext)
  const { monitorId } = props

  const handleDeleteMonitor = () => {
    deleteMonitor({ _id: monitorId }, (result) => {
      if (result.status === 'success') {
        //history.push("/")
      }
    })
  }

  return (
    <Button colorScheme="purple" size="xs" onClick={handleDeleteMonitor}>
      delete
    </Button>
  )
}

export default DeleteMonitor

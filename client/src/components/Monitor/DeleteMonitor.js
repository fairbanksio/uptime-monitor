import React, { useContext } from 'react'

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
    <button className="user" onClick={handleDeleteMonitor}>
      delete
    </button>
  )
}

export default DeleteMonitor

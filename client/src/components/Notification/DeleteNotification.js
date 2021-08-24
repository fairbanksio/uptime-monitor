import React, { useContext } from 'react'

import { NotificationContext } from '../../contexts/NotificationContext'

function DeleteNotification(props) {
  const { deleteNotification } = useContext(NotificationContext)
  const { notificationId } = props

  const handleDeleteNotification = () => {
    deleteNotification({ _id: notificationId }, (result) => {
      if (result.status === 'success') {
        //history.push("/")
      }
    })
  }

  return (
    <button className="user" onClick={handleDeleteNotification}>
      delete
    </button>
  )
}

export default DeleteNotification

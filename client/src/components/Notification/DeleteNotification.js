import React, { useContext } from 'react'
import { Button } from '@chakra-ui/react'

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
    <Button colorScheme="purple" size="xs" onClick={handleDeleteNotification}>
      delete
    </Button>
  )
}

export default DeleteNotification

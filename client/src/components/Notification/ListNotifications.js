import React, { useContext } from 'react'

import DeleteNotification from './DeleteNotification'
import UpdateNotification from './UpdateNotification'
import { NotificationContext } from '../../contexts/NotificationContext'

function ListNotifications() {
  const { notifications } = useContext(NotificationContext)
  return (
    <div>
      <h2>Notifications List:</h2>
      <div>
        {notifications.map((notification, key) => (
          <div key={key} className="user">
            id: {notification._id}, name: {notification.name}, type:{' '}
            {notification.type}, config: {JSON.stringify(notification.config)}
            <DeleteNotification notificationId={notification._id} />
            <UpdateNotification notification={notification} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListNotifications

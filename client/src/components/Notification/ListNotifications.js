import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlack } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

import DeleteNotification from './DeleteNotification'
import UpdateNotification from './UpdateNotification'
import { NotificationContext } from '../../contexts/NotificationContext'

function ListNotifications() {
  const { notifications } = useContext(NotificationContext)
  return (
    <div>
      {notifications.map((notification, key) => (
        <div key={key} className="user">
          {notification.name} (
          {notification.type === 'slack' ? (
            <FontAwesomeIcon icon={faSlack} />
          ) : (
            <FontAwesomeIcon icon={faMailBulk} />
          )}
          ) <UpdateNotification notification={notification} />{' '}
          <DeleteNotification notificationId={notification._id} />
        </div>
      ))}
    </div>
  )
}

export default ListNotifications

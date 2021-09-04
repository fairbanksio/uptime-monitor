import React, { createContext, useEffect, useMemo, useState } from 'react'

import notificationService from '../services/notification'
import useIsMountedRef from '../util/isMountedRef'
import { createStandaloneToast } from '@chakra-ui/react'
import { friendlyToast } from '../components/Util/FriendlyError'
export const NotificationContext = createContext()

const NotificationProvider = ({ user, children }) => {
  //const {user} = useContext(AuthContext)
  const isMountedRef = useIsMountedRef()
  const [notifications, setNotifications] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)

  const toast = createStandaloneToast()

  // refresh notifications
  useEffect(() => {
    if (user) {
      notificationService
        .getNotifications()
        .then((notifications) => {
          if (isMountedRef.current) {
            setNotifications(notifications.data)
          }
        })
        .catch((_error) => {})
        .finally(() => {
          if (isMountedRef.current) {
            setLoadingInitial(false)
          }
        })
    } else {
      if (isMountedRef.current) {
        setLoadingInitial(false)
      }
    }
  }, [user, isMountedRef])

  useEffect(() => {
    if (error) {
      const id = 'notification-context-toast'
      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'There was a problem with your request',
          description: friendlyToast(error),
          status: 'error',
          variant: 'subtle',
          duration: 2000,
          isClosable: true,
        })
      }
    }
    setError(undefined) // eslint-disable-next-line
  }, [error])

  // Create Notification
  const createNotification = (payload, cb) => {
    setLoading(true)
    notificationService
      .createNotification(payload)
      .then((notification) => {
        // update notifications state with new notification
        setNotifications((notifications) => [
          ...notifications,
          notification.data,
        ])
        cb({ result: notification.data, status: 'success' })
      })
      .catch((error) => {
        setError(error)
        cb({ result: error, status: 'failure' })
      })
      .finally(() => setLoading(false))
  }

  // Update
  const updateNotification = (payload, cb) => {
    setLoading(true)
    notificationService
      .updateNotification(payload)
      .then((notification) => {
        // update individuals notification state
        setNotifications(
          notifications.map((item, index) => {
            return item._id === payload._id ? notification.data : item
          })
        )
      })
      .catch((error) => {
        setError(error)
        cb({ result: error, status: 'failure' })
      })
      .finally(() => setLoading(false))
  }

  // Delete
  const deleteNotification = (payload, cb) => {
    setLoading(true)
    notificationService
      .deleteNotification(payload)
      .then((notification) => {
        // delete notification from state
        setNotifications(
          notifications.filter(
            (notification) => notification._id !== payload._id
          )
        )
      })
      .catch((error) => {
        setError(error)
        cb({ result: error, status: 'failure' })
      })
      .finally(() => setLoading(false))
  }

  // useMemo for peformance/rendering
  const memoedValue = useMemo(
    () => ({
      notifications,
      loading,
      error,
      createNotification,
      deleteNotification,
      updateNotification,
    }), // eslint-disable-next-line
    [notifications, loading, error]
  )

  return (
    <NotificationContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </NotificationContext.Provider>
  )
}
export default NotificationProvider

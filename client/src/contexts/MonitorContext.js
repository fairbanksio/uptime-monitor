import React, { createContext, useEffect, useMemo, useState } from 'react'
import useIsMountedRef from '../util/isMountedRef'
import monitorService from '../services/monitor'
import { createStandaloneToast } from '@chakra-ui/react'
import { friendlyToast } from '../components/Util/FriendlyError'
export const MonitorContext = createContext()

const MonitorProvider = ({ user, children }) => {
  const isMountedRef = useIsMountedRef()
  const [monitors, setMonitors] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(null)
  const toast = createStandaloneToast()

  const refreshMonitors = (cb) => {
    monitorService
        .getMonitors()
        .then((monitors) => {
          if (isMountedRef.current) {
            setMonitors(monitors.data)
          }
        })
        .catch((_error) => {})
        .finally(() => {
          cb()
        })
  }
  // refresh monitors
  useEffect(() => {
    if (user) {
      setLoadingInitial(true)
      refreshMonitors(() =>{
        if (isMountedRef.current) {
          setLoadingInitial(false)
        }
      })
      let interval = setInterval(()=>{
        refreshMonitors(() =>{
          if (isMountedRef.current) {
            setLoadingInitial(false)
          }
        })  // Increment, set in context
      }, 60 * 1000)
      setRefreshInterval(interval)
    } else {
      if (isMountedRef.current) {
        setLoadingInitial(false)
      }
      clearInterval(refreshInterval)
    }
    // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if (error) {
      const id = 'monitor-context-toast'
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

  // Create Monitor
  const createMonitor = (payload, cb) => {
    setLoading(true)
    monitorService
      .createMonitor(payload)
      .then((monitor) => {
        // update monitors state with new monitor
        setMonitors((monitors) => [...monitors, monitor.data])
        cb({ result: monitor.data, status: 'success' })
      })
      .catch((error) => {
        setError(error)
        cb({ result: error, status: 'failure' })
      })
      .finally(() => setLoading(false))
  }

  // Update
  const updateMonitor = (payload, cb) => {
    setLoading(true)
    monitorService
      .updateMonitor(payload)
      .then((monitor) => {
        // update individuals monitor state
        setMonitors(
          monitors.map((item, index) => {
            return item._id === payload._id ? monitor.data : item
          })
        )
        cb({ result: monitor.data, status: 'success' })
      })
      .catch((error) => {
        setError(error)
        cb({ result: error, status: 'failure' })
      })
      .finally(() => setLoading(false))
  }

  // Delete
  const deleteMonitor = (payload, cb) => {
    setLoading(true)
    monitorService
      .deleteMonitor(payload)
      .then((monitor) => {
        // update monitors state with new monitor
        setMonitors(monitors.filter((monitor) => monitor._id !== payload._id))
        cb({ result: monitor.data, status: 'success' })
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
      monitors,
      loading,
      error,
      createMonitor,
      deleteMonitor,
      updateMonitor,
      refreshMonitors,
    }), // eslint-disable-next-line
    [monitors, loading, error]
  )

  return (
    <MonitorContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </MonitorContext.Provider>
  )
}
export default MonitorProvider

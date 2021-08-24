import axiosClient from '../http-common'

const createMonitor = (monitor) => {
  return axiosClient.post('/monitors', monitor)
}

const updateMonitor = (monitor) => {
  //extract changes (omit unnecessary extras)
  const { _id, name, config, interval, enabled, notifications } = monitor

  return axiosClient.post('/monitors/' + _id, {
    _id,
    name,
    config,
    interval,
    enabled,
    notifications,
  })
}

const deleteMonitor = ({ _id }) => {
  return axiosClient.delete('/monitors/' + _id)
}

const getMonitors = () => {
  return axiosClient.get('/monitors')
}

const exports = {
  createMonitor,
  getMonitors,
  deleteMonitor,
  updateMonitor,
}
export default exports

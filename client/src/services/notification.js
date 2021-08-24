import axiosClient from '../http-common'

const createNotification = (notification) => {
  return axiosClient.post('/notifications', notification)
}

const updateNotification = (notification) => {
  //extract changes (omit unnecessary extras)
  const { _id, name, config, type } = notification

  return axiosClient.post('/notifications/' + _id, {
    _id,
    name,
    config,
    type,
  })
}

const deleteNotification = ({ _id }) => {
  return axiosClient.delete('/notifications/' + _id)
}

const getNotifications = () => {
  return axiosClient.get('/notifications')
}

const exports = {
  createNotification,
  getNotifications,
  deleteNotification,
  updateNotification,
}
export default exports

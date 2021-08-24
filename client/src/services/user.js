import axiosClient from '../http-common'

const getCurrentUser = () => {
  return axiosClient.get('/users/current')
}

const register = (username, password) => {
  return axiosClient.post('/users', { username: username, password: password })
}

const exports = {
  register,
  getCurrentUser,
}
export default exports

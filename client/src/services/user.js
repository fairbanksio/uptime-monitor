import axiosClient from '../http-common'

const getCurrentUser = () => {
  return axiosClient.get('/users/current')
}

const register = (username, password, email) => {
  return axiosClient.post('/users', {
    username: username,
    password: password,
    email: email,
  })
}

const exports = {
  register,
  getCurrentUser,
}
export default exports

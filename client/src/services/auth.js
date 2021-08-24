import axiosClient from '../http-common'

const login = (username, password) => {
  return axiosClient.post('/auth/login', {
    username: username,
    password: password,
  })
}

//const logout = () => {
//  return axiosClient.post("/auth/logout");
//};

const exports = {
  login,
  //logout
}
export default exports

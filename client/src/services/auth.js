import axiosClient from '../http-common'

const login = (username, password) => {
  return axiosClient.post('/auth/login', {
    username: username,
    password: password,
  })
}

const loginGoogle = (response) => {
  return axiosClient.post('/auth/google', {
    access_token: response.accessToken
  })
};

//const logout = () => {
//  return axiosClient.post("/auth/logout");
//};

const exports = {
  login,
  loginGoogle,
  //logout
}
export default exports

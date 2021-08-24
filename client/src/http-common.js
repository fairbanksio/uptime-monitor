import axios from 'axios'

const apiUrl = process.env.REACT_APP_API || '/api' //assume api is on the same host as web app unless overridden for development
axios.defaults.headers.common = {
  authorization: 'jwt ' + localStorage.getItem('jwtToken'),
}
export default axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
})

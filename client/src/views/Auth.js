import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'

function Auth(props) {
  return (
    <div className="App">
      {props.action === 'login' ? <Login /> : <Register />}
    </div>
  )
}
export default Auth

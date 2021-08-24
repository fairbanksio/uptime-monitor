import React, { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import FriendlyError from '../Util/FriendlyError'
import { Button, Input } from '@chakra-ui/react'

function Register() {
  const { register, error } = useContext(AuthContext)
  const history = useHistory()
  //const { user, loading, error, login, register, logout } = auth();

  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    password: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setRegisterInfo({ ...registerInfo, [name]: value })
  }

  const registerUser = () => {
    register(registerInfo.username, registerInfo.password, (result) => {
      if (result.status === 'success') {
        history.push('/')
      }
    })
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <Input
            type="text"
            id="username"
            required
            value={registerInfo.username}
            onChange={handleInputChange}
            name="username"
            placeholder="username"
            size="md"
            width={'300'}
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            id="password"
            required
            value={registerInfo.password}
            onChange={handleInputChange}
            name="password"
            placeholder="password"
            size="md"
            width={'300'}
          />
        </div>
        <br />
        <Button onClick={registerUser} colorScheme="purple">
          Register
        </Button>
        <br />
        {error && <FriendlyError error={error} />}
        <br />
      </div>
    </div>
  )
}

export default Register

import React, { useState } from 'react'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import { Button } from '@chakra-ui/react'

function Homepage() {
  const [login, setLogin] = useState(true)
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            'text-decoration': 'none',
            color: 'white',
            'font-size': '32px',
          }}
        >
          Uptime Monitor
        </a>
        <hr width={'300'} />
        &nbsp;
        {login ? <Login /> : <Register />}
        <hr width={'300'} />
        <Button
          onClick={(e) => {
            setLogin(!login)
          }}
          colorScheme="grey"
          variant="link"
        >
          {!login ? 'login' : 'sign up'}
        </Button>
      </header>
    </div>
  )
}
export default Homepage

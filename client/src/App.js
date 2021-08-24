import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import React, { useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import AuthProvider from './contexts/AuthContext'
import MonitorProvider from './contexts/MonitorContext'
import NotificationProvider from './contexts/NotificationContext'
import { ChakraProvider } from '@chakra-ui/react'

import Dashboard from './views/Dashboard'
import Homepage from './views/Homepage'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        user && !loading ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

function App() {
  const auth = useContext(AuthContext)
  return (
    <Router>
      <MonitorProvider user={auth.user}>
        <NotificationProvider user={auth.user}>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </NotificationProvider>
      </MonitorProvider>

      <Switch>
        <Route path="/" exact={true} component={Homepage} />
      </Switch>
    </Router>
  )
}

function AppWrapper() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default AppWrapper

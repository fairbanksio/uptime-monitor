import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import React, { useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import AuthProvider from './contexts/AuthContext'
import MonitorProvider from './contexts/MonitorContext'
import PageProvider from './contexts/PageContext'
import NotificationProvider from './contexts/NotificationContext'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

import Monitors from './views/Monitors'
import Notifications from './views/Notifications'
import Pages from './views/Pages'
import Account from './views/Account'
import Dashboard from './views/Dashboard'
import Homepage from './views/Homepage'
import PublicPage from './views/PublicPage'

const theme = extendTheme({
  shadows: {
    outline: null,
  },
})

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
  const {user, loading} = useContext(AuthContext)
  return (
    <Router>
      <MonitorProvider user={user}>
        <PageProvider user={user}>
          <NotificationProvider user={user}>
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/monitors" component={Monitors} />
              <PrivateRoute path="/notifications" component={Notifications} />
              <PrivateRoute path="/pages" component={Pages} />
              <PrivateRoute path="/account" component={Account} />
            </Switch>
          </NotificationProvider>
        </PageProvider>
      </MonitorProvider>

      <Switch>
      <Route path="/:pageSlug" component={PublicPage}/>
        <Route path="/" exact={true} render={(props) => user && !loading ? <Redirect to="/dashboard" /> : <Homepage/>}
      />
      </Switch>
    </Router>
  )
}

function AppWrapper() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default AppWrapper

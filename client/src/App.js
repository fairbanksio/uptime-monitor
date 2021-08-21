import './App.css';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import React, { useContext } from "react";
import { BrowserRouter as Router,} from 'react-router-dom';
import {AuthContext} from './contexts/AuthContext'
import AuthProvider from './contexts/AuthContext'
import MonitorProvider from './contexts/MonitorContext'
import NotificationProvider from './contexts/NotificationContext'

import Auth from './views/Auth'
import Dashboard from './views/Dashboard'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route {...rest} render={(props) => (
      auth.user ?
        <Component {...props} /> : <Redirect to='/login' />
    )} />
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={() => <Auth action={"register"}/>} />
        <Route path="/login" component={() => <Auth action={"login"}/>} />
        <PrivateRoute path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <MonitorProvider>
        <NotificationProvider>
          <App/>
        </NotificationProvider>
      </MonitorProvider>
    </AuthProvider>
  )
}

export default AppWrapper;

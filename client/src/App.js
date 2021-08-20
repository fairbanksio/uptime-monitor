import './App.css';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import React, { useContext } from "react";

import {AuthContext} from './contexts/AuthContext'

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
    <Switch>
      <Route path="/register" component={() => <Auth action={"register"}/>} />
      <Route path="/login" component={() => <Auth action={"login"}/>} />
      <PrivateRoute path="/" component={Dashboard} />
    </Switch>
  );
}

export default App;

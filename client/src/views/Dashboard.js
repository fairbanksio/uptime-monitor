import React, { useContext } from "react";
import {AuthContext} from "../contexts/AuthContext";
import CreateMonitor from '../components/Monitor/CreateMonitor'
import ListMonitors from '../components/Monitor/ListMonitors'

import CreateNotification from '../components/Notification/CreateNotification'
import ListNotifications from '../components/Notification/ListNotifications'

function Dashboard() {
    const auth = useContext(AuthContext)
    return (
    <div className="App">
    
      Username: {auth.user.username}
      <button onClick={auth.logout} className="btn btn-success">
        Logout
      </button>

      <CreateMonitor/>
      <CreateNotification/>
      <ListNotifications/>
      <ListMonitors/>

    </div>
    );
  }
  export default Dashboard;
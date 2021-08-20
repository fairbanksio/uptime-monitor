import React, { useContext } from "react";

import {MonitorContext} from '../../contexts/MonitorContext'
import DeleteMonitor from './DeleteMonitor'
import UpdateMonitor from './UpdateMonitor'
import MonitorEvents from './MonitorEvents'
import MonitorHeartbeats from './MonitorHeartbeats'

function ListMonitors() {
  const {monitors} = useContext(MonitorContext)
  
  return (

    <div>
      <h2>Monitors List:</h2>
      {monitors.map((monitor, key) => (
        <div>
          <div key={key} className="user">name: {monitor.name}, enabled: {monitor.enabled? "true": "false"}, type: {monitor.type}, interval: {monitor.interval}, config: {JSON.stringify(monitor.config)}<DeleteMonitor monitorId={monitor._id}/><UpdateMonitor monitor={monitor}/></div>
          <MonitorEvents monitor={monitor}/>
          <MonitorHeartbeats monitor={monitor}/>
        </div>
      ))}

    </div>

  );
}

export default ListMonitors;
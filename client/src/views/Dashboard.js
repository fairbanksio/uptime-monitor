import CreateMonitor from '../components/Monitor/CreateMonitor'
import ListMonitors from '../components/Monitor/ListMonitors'
import CreateNotification from '../components/Notification/CreateNotification'
import ListNotifications from '../components/Notification/ListNotifications'
import Navbar from '../components/Navbar'

function Dashboard() {
  return (
    <div className="App">
      <Navbar />
      <ListNotifications />
      <ListMonitors />
    </div>
  )
}
export default Dashboard

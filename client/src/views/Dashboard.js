import ListMonitors from '../components/Monitor/ListMonitors'
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

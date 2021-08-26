import { Grid, GridItem } from '@chakra-ui/react'

import ListMonitors from '../components/Monitor/ListMonitors'
import ListNotifications from '../components/Notification/ListNotifications'
import Navbar from '../components/Navbar'

function Dashboard() {
  return (
    <div className="App">
      <Navbar />
      <Grid h="100vh" templateColumns="repeat(6, 1fr)" gap={4}>
        <GridItem colSpan={1} />
        <GridItem colSpan={4}>
          <ListNotifications />
          <ListMonitors />
        </GridItem>
        <GridItem colSpan={1} />
      </Grid>
    </div>
  )
}
export default Dashboard

import { Grid, GridItem } from '@chakra-ui/react'

import Navbar from '../components/Navbar'
import ListMonitors from '../components/Monitor/ListMonitors'
// import ListNotifications from '../components/Notification/ListNotifications'

function Dashboard() {
  return (
    <div className="App">
      <Navbar />
      <div className="Content">
        <Grid h="100vh" templateColumns="repeat(9, 1fr)" gap={4}>
          <GridItem colSpan={1} />
          <GridItem colSpan={7}>
            {/* <Text fontSize="4xl">Monitors</Text> */}
            <ListMonitors />
            {/* <Text fontSize="4xl">Notifiers</Text>
            <ListNotifications /> */}
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </div>
    </div>
  )
}
export default Dashboard

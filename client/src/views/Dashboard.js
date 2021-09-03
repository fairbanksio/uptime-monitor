import { Grid, GridItem } from '@chakra-ui/react'

import Navbar from '../components/Navbar'
import ListMonitors from '../components/Monitor/ListMonitors'
import LatencyChart from '../components/Graph/LatencyChart'

function Dashboard() {
  return (
    <div className="App">
      <Navbar />
      <div className="Content">
        <Grid h="100vh" templateColumns="repeat(9, 1fr)" gap={4}>
          <GridItem colSpan={1} />
          <GridItem colSpan={7}>
            <LatencyChart />
            <ListMonitors />
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </div>
    </div>
  )
}
export default Dashboard

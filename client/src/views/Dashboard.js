import { Grid, GridItem, Flex, Heading, Spacer, Box } from '@chakra-ui/react'
import ListMonitors from '../components/Monitor/ListMonitors'
import SimpleSidebar from '../components/Sidebar'

function Dashboard() {
  return (
    <div className="App">
      <SimpleSidebar>
        <div className="Content">
          <Grid templateColumns="repeat(9, 1fr)" gap={4}>
            <GridItem colSpan={1} />
              <GridItem colSpan={7}>
                <Flex
                  as="h1"
                  align="center"
                  justify="space-between"
                  wrap="wrap"
                  padding={2}
                >
                  <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                      Monitors
                    </Heading>
                  </Flex>
                  <Spacer />
                    <Box p="4">[+Add Monitor]</Box>
                </Flex>
                <ListMonitors />
              </GridItem>
            <GridItem colSpan={1} />
          </Grid>
        </div>
      </SimpleSidebar>
    </div>
  )
}
export default Dashboard


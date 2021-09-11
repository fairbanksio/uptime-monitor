import { Grid, GridItem, Flex, Heading, Spacer, Box } from '@chakra-ui/react'
import ListMonitors from '../components/Monitor/ListMonitors'
import SidebarWrapper from '../components/SidebarWrapper'
import CreateMonitor from '../components/Monitor/CreateMonitor'

function Dashboard() {
  return (
    
    <div className="App">
      <SidebarWrapper>
          <Grid templateColumns="repeat(7, 1fr)" gap={4} >
            <GridItem colSpan={7}>
              <Flex
                as="h1"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding={2}
              >
                <Flex align="center" mr={2}>
                  <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                    Dashboard
                  </Heading>
                </Flex>
                <Spacer />
                  <Box p="4"><CreateMonitor/></Box>
              </Flex>
              <ListMonitors />
            </GridItem>
          </Grid>
      </SidebarWrapper>
    </div>
  )
}
export default Dashboard


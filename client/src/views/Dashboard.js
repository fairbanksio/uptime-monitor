import { Grid, GridItem, Flex, Heading, Spacer, Box } from '@chakra-ui/react'
import ListMonitors from '../components/Monitor/ListMonitors'
import SidebarWrapper from '../components/SidebarWrapper'
import CreateMonitor from '../components/Monitor/CreateMonitor'

function Dashboard() {
  return (
    <SidebarWrapper>
      <Flex
        as="h1"
        align="center"
        justify="space-between"
        wrap="wrap"
        p="0"
        pt="8"
        pb="8" pr="0"
        m={0}
      >
        <Flex align="center" mr={2}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            Dashboard
          </Heading>
        </Flex>
        <Spacer />
        <Box ><CreateMonitor/></Box>
      </Flex>
      <ListMonitors />
    </SidebarWrapper>
  )
}
export default Dashboard


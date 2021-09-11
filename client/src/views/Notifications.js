import { Grid, GridItem, Flex, Heading, Spacer, Box } from '@chakra-ui/react'
import ListNotifications from '../components/Notification/ListNotifications'
import CreateNotification from '../components/Notification/CreateNotification'
import SidebarWrapper from '../components/SidebarWrapper'

function Notifications() {
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
            Notifications
          </Heading>
        </Flex>
        <Spacer />
        <Box><CreateNotification/></Box>
      </Flex>
      <ListNotifications />
    </SidebarWrapper>
  )
}
export default Notifications


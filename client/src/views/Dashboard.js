import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex,
  Grid,
  Heading,
  Spacer,
  Box,
} from '@chakra-ui/react'

import SidebarWrapper from '../components/SidebarWrapper'
import PieChart from '../components/Graph/PieChart'

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
        pb="8"
        pr="0"
        m={0}
      >
        <Flex align="center" mr={2}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            Dashboard
          </Heading>
        </Flex>
        <Spacer />
        <Box></Box>
      </Flex>
      <Box w="100%" borderColor="#484B51" borderWidth="1px" borderRadius="md">
        <Alert status="warning" variant="solid">
          <AlertIcon />
          <AlertTitle mr={2}>Planned Maintenance!</AlertTitle>
          <AlertDescription>
            Uptime Monitor will be temporarily unavailable on Nov. 1st, 2021 as
            we migrate database hosts.
          </AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      </Box>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Box w="100%" borderColor="#484B51" borderWidth="1px" borderRadius="md">
          <PieChart />
        </Box>
        <Box w="100%" borderColor="#484B51" borderWidth="1px" borderRadius="md">
          <PieChart />
        </Box>
        <Box w="100%" borderColor="#484B51" borderWidth="1px" borderRadius="md">
          <PieChart />
        </Box>
      </Grid>
    </SidebarWrapper>
  )
}
export default Dashboard

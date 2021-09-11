import { Flex, Heading, Spacer, Box, Button } from '@chakra-ui/react'
import SidebarWrapper from '../components/SidebarWrapper'
import AccountOverview from '../components/Account/AccountOverview'

function Account() {
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
            Account
          </Heading>
        </Flex>
        <Spacer />
        <Box>
          <Button
            variant="ghost"
            colorScheme="pink"
            size="sm"
            onClick={function () {
              setTimeout(() => {}, 1000)
            }}
          >
            Delete Account
          </Button>
        </Box>
      </Flex>
      <AccountOverview />
    </SidebarWrapper>
  )
}
export default Account

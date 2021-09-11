import { Flex, Heading, Spacer, Box } from '@chakra-ui/react'
import SidebarWrapper from '../components/SidebarWrapper'
import ListPages from '../components/Page/ListPages'
import CreatePage from '../components/Page/CreatePage'

function Pages() {
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
            Pages
          </Heading>
        </Flex>
        <Spacer />
        <Box>
          <CreatePage />
        </Box>
      </Flex>
      <ListPages />
    </SidebarWrapper>
  )
}
export default Pages

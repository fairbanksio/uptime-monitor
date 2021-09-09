import { Grid, GridItem, Flex, Heading, Spacer, Box } from '@chakra-ui/react'
import SidebarWrapper from '../components/SidebarWrapper'
import ListPages from '../components/Page/ListPages'
import CreatePage from '../components/Page/CreatePage'

function Pages() {
  return (
    <div className="App">
      <SidebarWrapper>
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
                      Pages
                    </Heading>
                  </Flex>
                  <Spacer />
                    <Box p="4"><CreatePage/></Box>
                </Flex>
                <ListPages/>
              </GridItem>
            <GridItem colSpan={1} />
          </Grid>
      </SidebarWrapper>
    </div>
  )
}
export default Pages


import { Grid, GridItem, Flex, Heading, Spacer, Box, Button } from '@chakra-ui/react'
import SidebarWrapper from '../components/SidebarWrapper'
import AccountOverview from '../components/Account/AccountOverview'

function Account() {
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
                      Account
                    </Heading>
                  </Flex>
                  <Spacer />
                  <Box p="4">
                    <Button
                      variant="ghost"
                      colorScheme="pink"
                      
                      onClick={function () {
                        setTimeout(() => {
                        }, 1000)
                      }}
                    >
                      Delete Account
                    </Button>
                  </Box>
                </Flex>
                <AccountOverview/>
              </GridItem>
            <GridItem colSpan={1} />
          </Grid>
      </SidebarWrapper>
    </div>
  )
}
export default Account


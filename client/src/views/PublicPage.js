import { Grid, GridItem, Flex, Heading, Spacer, Box } from '@chakra-ui/react'
import PublicPageContext from '../contexts/PublicPageContext'
import {
  useParams
} from "react-router-dom";

function PublicPage() {
  let { pageSlug } = useParams();
  
  return (
    <PublicPageContext slug={pageSlug}>
      <div className="App">
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
                    Public Page
                  </Heading>
                </Flex>
                <Spacer />
                  <Box p="4">{pageSlug}</Box>
              </Flex>
            </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </div>
    </PublicPageContext>
  )
}
export default PublicPage


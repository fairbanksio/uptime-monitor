import React, { useContext } from 'react'
import { Grid, GridItem, Flex, Heading, Spacer, Box } from '@chakra-ui/react'
import PublicPageProvider, {PublicPageContext} from '../contexts/PublicPageContext'
import {
  useParams
} from "react-router-dom";

const PublicPageWithContext = () => {
  let { pageSlug } = useParams();
  return (
    <PublicPageProvider slug={pageSlug}><PublicPage/></PublicPageProvider>
  )
}

function PublicPage() {
  const { page} = useContext(PublicPageContext)
  return (
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
                    {page.name}
                  </Heading>
                </Flex>
                <Spacer />
                  <Box p="4">{page.slug}</Box>
              </Flex>
            </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </div>
  )
}
export default PublicPageWithContext


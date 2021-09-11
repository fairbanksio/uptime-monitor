import React, { useContext } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import DeletePage from './DeletePage'
import UpdatePage from './UpdatePage'

import { PageContext } from '../../contexts/PageContext'

function ListPages() {
  const { pages } = useContext(PageContext)
  return (
    <div>
      {pages.length > 0 ? (
        <Accordion allowMultiple>
          {pages.map((page, key) => (
            <AccordionItem key={key}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Grid templateColumns="repeat(10, 1fr)">
                    <GridItem colSpan={9}>
                      <Text fontSize="2xl">{page.name}</Text>
                    </GridItem>
                  </Grid>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Link to={'/' + page.slug}> View Page </Link>
                <UpdatePage page={page} /> <DeletePage pageId={page._id} />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div>
          <Text>No pages configured</Text>
        </div>
      )}
    </div>
  )
}

export default ListPages

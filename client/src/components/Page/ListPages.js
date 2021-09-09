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
                  <Grid
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(10, 1fr)"
                  >
                    <GridItem
                      rowSpan={2}
                      colSpan={1}
                      style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: '20px',
                      }}
                    >
                      [ICON HERE]
                    </GridItem>
                    <GridItem colSpan={9}>
                      <Text fontSize="2xl">{page.name}</Text>
                    </GridItem>
                    <GridItem colSpan={5}>
                      <div style={{ display: 'inline-block' }}>
                        [config stuff here]
                      </div>
                    </GridItem>
                    <GridItem colSpan={4} />
                  </Grid>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                [DETAiLS HERE]
                <br />
                {/* <Button
                  size="xs"
                  colorScheme="purple"
                  onClick={(e) => refreshPages(() => {})}
                >
                  refresh
                </Button>{' '} */}
                <UpdatePage page={page} />{' '}
                <DeletePage pageId={page._id} />
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

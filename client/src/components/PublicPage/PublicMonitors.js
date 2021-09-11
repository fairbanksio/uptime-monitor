import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  Link,
  Text,
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

function ListMonitors({monitors}) {
  return (
    <div>
      {monitors.length > 0 ? (
        <Accordion allowMultiple>
          {monitors.map((monitor, key) => (
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
                      {monitor.status === 'UP' ? (
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          size="2x"
                          style={{ color: 'green' }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          size="2x"
                          style={{ color: 'red' }}
                        />
                      )}
                    </GridItem>
                    <GridItem colSpan={9}>
                      <Text fontSize="2xl">{monitor.name}</Text>
                    </GridItem>
                    <GridItem colSpan={5}>
                      <div style={{ display: 'inline-block' }}>
                        <a
                          href={monitor.config.httpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Link fontSize="sm" style={{ color: 'grey' }}>
                            {monitor.config.httpUrl}
                          </Link>
                        </a>
                      </div>
                    </GridItem>
                    <GridItem colSpan={4} />
                  </Grid>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div>
          <Text>No monitors configured</Text>
        </div>
      )}
    </div>
  )
}

export default ListMonitors

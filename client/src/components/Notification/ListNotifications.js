import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlack } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

import DeleteNotification from './DeleteNotification'
import UpdateNotification from './UpdateNotification'
import { NotificationContext } from '../../contexts/NotificationContext'

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

function ListNotifications() {
  const { notifications } = useContext(NotificationContext)
  return (
    <Accordion allowMultiple>
      {notifications.length > 0 ? (
        notifications.map((notification, key) => (
          <AccordionItem key={key}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Grid templateColumns="repeat(5, 1fr)">
                  <GridItem
                    colSpan={1}
                    style={{
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      marginLeft: '20px',
                    }}
                  >
                    {notification.type === 'slack' ? (
                      <FontAwesomeIcon icon={faSlack} size="lg" />
                    ) : (
                      <FontAwesomeIcon icon={faMailBulk} size="lg" />
                    )}{' '}
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Text fontSize="2xl">{notification.name}</Text>
                  </GridItem>
                </Grid>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Box>Notification Content</Box>
              <UpdateNotification notification={notification} />{' '}
              <DeleteNotification notificationId={notification._id} />
            </AccordionPanel>
          </AccordionItem>
        ))
      ) : (
        <div>No notification agent configured</div>
      )}
    </Accordion>
  )
}

export default ListNotifications

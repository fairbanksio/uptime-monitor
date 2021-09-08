import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../contexts/AuthContext'
import CreateMonitor from './Monitor/CreateMonitor.js'
import CreateNotification from './Notification/CreateNotification.js'

import {
  Button,
  Flex,
  Box,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  useDisclosure,
  Heading
} from '@chakra-ui/react'

const RightNavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, logout } = useContext(AuthContext)
  const btnRef = React.useRef()

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="purple"
        variant="outline"
        onClick={onOpen}
        size="sm"
      >
        {user.username}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Uptime Monitors</DrawerHeader>
          <DrawerBody>
            <CreateMonitor />
          </DrawerBody>
          <hr />
          <DrawerHeader>Notification Agents</DrawerHeader>
          <DrawerBody>
            <CreateNotification />
          </DrawerBody>
          <DrawerFooter>
            <Text
              fontSize="xs"
              style={{
                marginRight: '60px',
                marginTop: '2.5px',
                color: '#484B51',
              }}
            >
              Uptime Monitor &copy; {new Date().getFullYear()} - v
              {process.env.REACT_APP_VERSION}
            </Text>
            <Button
              variant="ghost"
              colorScheme="pink"
              mr={3}
              onClick={function () {
                setTimeout(() => {
                  logout()
                }, 1000)
              }}
            >
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function Navbar() {
  return (

    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={2}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          <FontAwesomeIcon
            icon={faNetworkWired}
            className="header-logo"
            size="md"
          />
          Uptime Monitor
        </Heading>
      </Flex>
        
        <Spacer />
        <Box p="4"><RightNavDrawer/></Box>
      </Flex>

  )
}
export default Navbar

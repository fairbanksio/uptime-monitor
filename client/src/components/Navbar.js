import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import CreateMonitor from './Monitor/CreateMonitor.js'
import CreateNotification from './Notification/CreateNotification.js'

import {
  Button,
  Input,
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
  useDisclosure,
  Select,
  Checkbox,
} from '@chakra-ui/react'

function UserDrawer() {
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
            <Button variant="ghost" colorScheme="pink" mr={3} onClick={logout}>
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <div>
      <Flex>
        <Box p="4">
          <i class="fas fa-network-wired"></i>
          <i class="fab fa-twitter"></i>
          <a href="/dashboard">Uptime Monitor</a>
        </Box>
        <Spacer />
        <Box p="4">{UserDrawer()}</Box>
      </Flex>
    </div>
  )
}
export default Navbar

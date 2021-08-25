import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

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
  CheckboxGroup,
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
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Uptime Monitors</DrawerHeader>
          <DrawerBody>
            <Input placeholder="Name" />
            <Input placeholder="Interval" />
            <Input placeholder="Webhook URL" />
            <Checkbox defaultIsChecked colorScheme="purple">
              Enabled
            </Checkbox>
            <div style={{ marginTop: '10px' }}>
              <Button variant="solid" colorScheme="purple" mr={3}>
                Save
              </Button>
              <Button variant="ghost" colorScheme="grey" mr={3}>
                Clear
              </Button>
            </div>
          </DrawerBody>
          <hr />
          <DrawerHeader>Notification Agents</DrawerHeader>
          <DrawerBody>
            <Input placeholder="Name" />
            <Select disabled placeholder="Type">
              <option selected value="slack">
                Slack
              </option>
              <option value="slack">Email</option>
            </Select>
            <Input placeholder="Slack Webhook URL" />
            <div style={{ marginTop: '10px' }}>
              <Button variant="solid" colorScheme="purple" mr={3}>
                Save
              </Button>
              <Button variant="ghost" colorScheme="grey" mr={3}>
                Clear
              </Button>
            </div>
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

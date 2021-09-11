import React, { useContext, useEffect, useState } from 'react'
import {
  IconButton,
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Spacer,VStack
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom'
import {
  FiHome,
  FiMenu,
  FiChevronsRight,
  FiChevronsLeft,
  FiLogOut,
  FiBell,
  FiUser,
  FiFile,
  FiActivity
} from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, url:"/dashboard" },
  { name: 'Monitors', icon: FiActivity, url:"/monitors" },
  { name: 'Pages', icon: FiFile, url:"/pages"  },
  { name: 'Notifications', icon: FiBell, url:"/notifications"  },
  { name: 'Account', icon: FiUser, url:"/account"  },
];

export default function SidebarWrapper({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ iconOnlyMode, setIconOnlyMode ] = useState(localStorage.getItem('iconOnlyMode') && localStorage.getItem('iconOnlyMode') === "true" ? true : false)

  useEffect(()=>{
    localStorage.setItem('iconOnlyMode', iconOnlyMode)
  },[iconOnlyMode])

  return (
    <Box minH="100vh" p="0" m="0" className="Content">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        iconOnlyMode={iconOnlyMode}
        setIconOnlyMode={setIconOnlyMode}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={iconOnlyMode? { base: 0, md: 20 } : { base: 0, md: 60 } } p="2">
        {children}
      </Box>
    </Box>
  );
}


const SidebarContent = ({ onClose, iconOnlyMode, setIconOnlyMode, ...rest }) => {
  const { logout } = useContext(AuthContext)
  
  return (
    <Box
      color='white'
      bg={useColorModeValue('#484b51', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.700', 'gray.700')}
      w={!iconOnlyMode? { base: 'full', md: 60 } : { base: 'full', md: 20 }}
      pos="fixed"
      h="full"
      {...rest}
      
    >
      {iconOnlyMode?
        <NavLink to="/" style={{ textDecoration: 'none' }} activeStyle={{
          fontWeight: "bold",
          color: "#6b46c1"
        }}>
          <Flex
            align="center"
            p="4"
            mt="4"
            mb="8"
            mx="4"
            borderRadius="lg"
            bg={'purple.500'}
            color= 'white'
            role="group"
            cursor="pointer"

            _hover={{
              bg: 'purple.500',
              color: 'white',
            }}>
              <FontAwesomeIcon
              icon={faNetworkWired}
            />
            {!iconOnlyMode && "Uptime Monitor"}
            
          </Flex>
        </NavLink>
      :
        <Flex h={{ base: '20', md: '40' }} alignItems="center" mx="8" justifyContent="space-between">
        
          <Text fontSize="2xl" fontFamily="monospace">
          
          <FontAwesomeIcon
              icon={faNetworkWired}
              className="header-logo"
              size="lg"
            />
            {!iconOnlyMode && "UptimeMonitor"
          }
          </Text>
        </Flex>
      }

      {LinkItems.map((link) => (
        !iconOnlyMode ? 
          <NavItem key={link.name} icon={link.icon} url={link.url}>
            {link.name}
          </NavItem>
        :
          <NavItem key={link.name} icon={link.icon} url={link.url}/>
      ))}

      <VStack position='absolute' bottom='2' w={"100%"}> 
        <Flex 
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          onClick={function () {
            setTimeout(() => {
              logout()
            }, 1000)
          }}
          color="pink"
          _hover={{
            bg: 'purple.500',
            color: 'white',
            
          }}
        >
          <Icon
            fontSize="16"
            mr={iconOnlyMode? "0" : "4" }
            as={FiLogOut}
          />
          {!iconOnlyMode && "Logout"}
        </Flex>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          color='gray.500'
          onClick={(e) => setIconOnlyMode(!iconOnlyMode)}
          _hover={{
            bg: 'purple.500',
            color: 'white',
            
          }}
          display={{ base: 'none', md: 'block' }}>
            <Icon
              fontSize="16"
              as={iconOnlyMode? FiChevronsRight : FiChevronsLeft}
            />

        </Flex>
      </VStack>
    </Box>

  );
};

const NavItem = ({ url, icon, children, ...rest }) => {
  return (
    <NavLink to={url} style={{ textDecoration: 'none' }} activeStyle={{
      fontWeight: "bold",
      color: "#6b46c1"
    }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'purple.500',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('#484b51', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.700', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <Text fontSize="2xl" fontFamily="monospace">
        <FontAwesomeIcon
            icon={faNetworkWired}
            className="header-logo"
            size="lg"
          />
          UptimeMonitor
        </Text>
        <Spacer/>
        <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
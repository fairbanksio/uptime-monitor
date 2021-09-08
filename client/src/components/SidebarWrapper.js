import React, { useContext } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Button,
  Spacer
} from '@chakra-ui/react';
import { Link} from 'react-router-dom'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../contexts/AuthContext'

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, url:"/dashboard" },
  { name: 'Monitors', icon: FiTrendingUp, url:"/monitors" },
  { name: 'Pages', icon: FiCompass, url:"/pages"  },
  { name: 'Notifications', icon: FiStar, url:"/notifications"  },
  { name: 'Account', icon: FiSettings, url:"/account"  },
];

export default function SidebarWrapper({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" p="0" m="0" className="Content">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
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
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        
      </Box>
    </Box>
  );
}


const SidebarContent = ({ onClose, ...rest }) => {
  const { logout } = useContext(AuthContext)
  return (
    <Box
    color='white'
      bg={useColorModeValue('#484b51', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.700', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h={{ base: '20', md: '40' }} alignItems="center" mx="8" justifyContent="space-between">
      
        <Text fontSize="2xl" fontFamily="monospace">
        <FontAwesomeIcon
            icon={faNetworkWired}
            className="header-logo"
            size="lg"
          />
          UptimeMonitor
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </NavItem>
      ))}

      <Button
        variant="ghost"
        colorScheme="pink"
        
        onClick={function () {
          setTimeout(() => {
            logout()
          }, 1000)
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

const NavItem = ({ url, icon, children, ...rest }) => {
  return (
    <Link to={url} style={{ textDecoration: 'none' }}>
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
    </Link>
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
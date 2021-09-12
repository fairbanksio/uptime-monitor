import React, { useContext } from 'react'
import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { AuthContext } from '../../contexts/AuthContext'

function AccountOverview() {
  const { user } = useContext(AuthContext)
  return (
    <Box flex="1" textAlign="left">
      <Grid templateColumns="repeat(10, 1fr)">
        <GridItem colSpan={10}>
          {user.picture ? (
            <Image
              borderRadius="full"
              src={user.picture}
              alt="account-picture"
            />
          ) : (
            <Avatar name={user.username} src="https://bit.ly/broken-link" />
          )}
        </GridItem>
        <GridItem colSpan={10}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="username"
              width={200}
              value={user.username}
              isDisabled
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={10}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="email"
              width={200}
              value={user.email}
              isDisabled
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem colSpan={10}>
          {/* <Text>Connected with:</Text>
          {user.authProviders && user.authProviders.google ? (
            <Text fontSize="2xl">Google</Text>
          ) : (
            <Text fontSize="2xl">Not connected to any social logins</Text>
          )} */}
        </GridItem>
      </Grid>
    </Box>
  )
}

export default AccountOverview

import React, { useContext } from 'react'
import { Box, Grid, GridItem, Text, Image } from '@chakra-ui/react'
import { AuthContext } from '../../contexts/AuthContext'

function AccountOverview() {
  const { user } = useContext(AuthContext)
  return (
    <Box flex="1" textAlign="left">
      <Grid templateColumns="repeat(10, 1fr)">
        <GridItem colSpan={10}>
          {user.picture && (
            <Image borderRadius="full" src={user.picture} alt="Segun Adebayo" />
          )}
        </GridItem>
        <GridItem colSpan={10}>
          <Text>Username:</Text>
          <Text fontSize="2xl">{user.username}</Text>
        </GridItem>
        <GridItem colSpan={10}>
          <Text>Email:</Text>
          <Text fontSize="2xl">{user.email}</Text>
        </GridItem>
        <GridItem colSpan={10}>
          <Text>Connected with:</Text>
          {user.authProviders && user.authProviders.google ? (
            <Text fontSize="2xl">Google</Text>
          ) : (
            <Text fontSize="2xl">Not connected to any social logins</Text>
          )}
        </GridItem>
      </Grid>
    </Box>
  )
}

export default AccountOverview

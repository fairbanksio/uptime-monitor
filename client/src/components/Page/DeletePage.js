import React, { useContext } from 'react'
import { Button } from '@chakra-ui/react'

import { PageContext } from '../../contexts/PageContext'

function DeletePage(props) {
  const { deletePage } = useContext(PageContext)
  const { pageId } = props

  const handleDeletePage = () => {
    deletePage({ _id: pageId }, (result) => {
      if (result.status === 'success') {
        //history.push("/")
      }
    })
  }

  return (
    <Button colorScheme="purple" size="xs" onClick={handleDeletePage}>
      delete
    </Button>
  )
}

export default DeletePage

import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  Button,
  Center,
  createStandaloneToast,
  Input,
  Select, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent} from '@chakra-ui/react'

import { PageContext } from '../../contexts/PageContext'

function CreatePage() {
  const { createPage, loading } = useContext(PageContext)
  const toast = createStandaloneToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()

  const initPageInfo = {
    name: '',
    type: '',
    slug: '',
    monitors: [],
  }
  let [pageInfo, setPageInfo] = useState(initPageInfo)

  const initFormValidation = {
    formErrors: {},
    nameValid: null,
    typeValid: null,
    slugValid: null,
  }
  let [formValidation, setFormValidation] = useState(initFormValidation)

  let [formValid, setFormValid] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPageInfo({ ...pageInfo, [name]: value })
    validateField(name, value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCreatePage()
    }
  }

  const handleClear = () => {
    pageInfo = setPageInfo(initPageInfo)
    setFormValidation(initFormValidation)
  }

  const validateField = (fieldName, value) => {
    // get existing form errors
    let newFormValidation = formValidation
  
    // update validation errors 
    switch(fieldName) {
      case 'name':
        newFormValidation.nameValid = value.length >= 1;
        newFormValidation.formErrors.name = newFormValidation.nameValid ? '' : ' is too short';
        break;
      case 'type':
        newFormValidation.typeValid = value.length >= 1;
        newFormValidation.formErrors.type = newFormValidation.typeValid ? '' : ' you must select a page type';
        break;
      case 'slug':
        newFormValidation.slugValid = value.length >= 1;
        newFormValidation.formErrors.slug = newFormValidation.slugValid ? '' : ' you must enter a valid url';
        break;
      default:
        break;
    }

    setFormValidation({
      ...formValidation, ...newFormValidation
    });

  }

  const validateForm = () => {
    if(formValidation.typeValid && formValidation.nameValid && formValidation.slugValid){
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }

  useEffect(() => {
    validateForm()
    //eslint-disable-next-line
  }, [formValidation])

  const handleCreatePage = () => {
    if(formValid){
      createPage(pageInfo, (result) => {
        if (result.status === 'success') {
          const id = 'page-created-toast'
          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Page created.',
              description: 'Your page is now running.',
              status: 'success',
              variant: 'subtle',
              duration: 3000,
              isClosable: true,
            })
          }
          handleClear()
        }
      })
    }
  }

  return (
    <>
      <Button colorScheme="purple"  onClick={onOpen}>
        Add Page
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new page</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              type="text"
              placeholder="Name"
              isRequired={true}
              value={pageInfo.name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              name="name"
              isInvalid={!formValidation.nameValid && formValidation.nameValid !== null}
            />

            <Center>
              <Select
                placeholder="Type"
                isRequired={true}
                onChange={handleInputChange}
                name="type"
                isInvalid={!formValidation.typeValid && formValidation.typeValid !== null}
              >
                <option value="http">Standard</option>
                <option value="keyword">Advanced</option>
              </Select>
            </Center>

            <Input
              type="text"
              placeholder="slug"
              isRequired={true}
              value={pageInfo.slug}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              name="slug"
              isInvalid={!formValidation.slugValid && formValidation.slugValid !== null}
            />

            
          </ModalBody>
          <ModalFooter>
          <Button
                onClick={handleCreatePage}
                variant="solid"
                colorScheme="purple"
                isLoading={loading}
                disabled={!formValid}
              >
                Create Page
              </Button>
              <Button onClick={handleClear} variant="ghost" colorScheme="grey">
                Clear
              </Button>
          <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePage

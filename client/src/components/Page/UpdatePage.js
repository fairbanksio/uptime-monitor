import React, { useState, useContext, useEffect, useRef } from 'react'
import { Button, Input, Select, Checkbox, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent, FormLabel } from '@chakra-ui/react'


import { PageContext } from '../../contexts/PageContext'
import { MonitorContext } from '../../contexts/MonitorContext'


function UpdatePage(props) {
  const { updatePage } = useContext(PageContext)
  const { monitors } = useContext(MonitorContext)
  const { page } = props
  const [pageInfo, setPageInfo] = useState(page)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()

  const initFormValidation = {
    formErrors: {},
    nameValid: null,
    typeValid: null,
    intervalValid: null,
    slugValid: null,
    httpKeywordValid: null
  }
  let [formValidation, setFormValidation] = useState(initFormValidation)

  let [formValid, setFormValid] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPageInfo({ ...pageInfo, [name]: value })
    validateField(name, value)
  }

  const handleUpdatePage = () => {
    if(formValid){
      updatePage(pageInfo, (result) => {
        if (result.status === 'success') {
          //history.push("/")
        }
      })
      onClose()
    }
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
  
  useEffect(() => {
    validateField('name', pageInfo['name'])
    validateField('type', pageInfo['type'])
    validateField('slug', pageInfo['slug'])
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    let newMonitors = pageInfo.monitors
    pageInfo.monitors.forEach((existingMonitor) => {
      let found = false
      monitors.forEach((newMonitor) => {
        if (found !== true) {
          if (newMonitor._id === existingMonitor) {
            found = true
          }
        }
      })
      if (!found) {
        newMonitors = newMonitors.filter(
          (item) => item !== existingMonitor
        )
      }
    })

    setPageInfo({ ...pageInfo, monitors: newMonitors })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitors])
  

  const handleMonitorChange = (event) => {
    const { id, checked } = event.target
    let newMonitors = pageInfo.monitors

    if (checked) {
      newMonitors.push(id)
    } else {
      newMonitors = newMonitors.filter((item) => item !== id)
    }

    setPageInfo({ ...pageInfo, monitors: newMonitors })
  }
  return (
    <>
      <Button colorScheme="purple" size="xs" onClick={onOpen}>
        update
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update page</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Name"
              isRequired={true}
              value={pageInfo.name}
              onChange={handleInputChange}
              name="name"
              isInvalid={!formValidation.nameValid && formValidation.nameValid !== null}
            />
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Type"
              isRequired={true}
              value={pageInfo.type}
              onChange={handleInputChange}
              name="type"
              isInvalid={!formValidation.typeValid && formValidation.typeValid !== null}
            >
              <option value="http">Standard</option>
              <option value="keyword">Advanced</option>
            </Select>

            <FormLabel>Slug</FormLabel>
            <Input
              type="text"
              placeholder="URL"
              isRequired={true}
              value={pageInfo.slug}
              onChange={handleInputChange}
              name="slug"
              isInvalid={!formValidation.slugValid && formValidation.slugValid !== null}
            />
            <div>
              <label htmlFor="monitors">Monitors</label>
              {monitors.length > 0 ? null : <div>No monitors configured</div>}
              {monitors &&
                monitors.map((monitor, key) => {
                  return (
                    <div key={key}>
                      <Checkbox
                        colorScheme="purple"
                        isChecked={pageInfo.monitors.includes(monitor._id)}
                        id={monitor._id}
                        name={monitor.name}
                        value={monitor.name}
                        onChange={handleMonitorChange}
                      >
                        {monitor.name}{' '}
                        
                      </Checkbox>
                    </div>
                  )
                })}
            </div>
            </ModalBody>
            
            <ModalFooter>
            <Button colorScheme="purple" onClick={handleUpdatePage} disabled={!formValid}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdatePage

import React, { useState, useContext, useEffect, useRef } from 'react'
import { Button, Center, Checkbox, Input, Select, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalContent, FormLabel } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlack } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

import { MonitorContext } from '../../contexts/MonitorContext'
import { NotificationContext } from '../../contexts/NotificationContext'

function UpdateMonitor(props) {
  const { updateMonitor } = useContext(MonitorContext)
  const { notifications } = useContext(NotificationContext)
  const { monitor } = props
  const [monitorInfo, setMonitorInfo] = useState(monitor)
  const [visible, setVisible] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setMonitorInfo({ ...monitorInfo, [name]: value })
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    setMonitorInfo({ ...monitorInfo, [name]: checked })
  }

  const handleConfigChange = (event) => {
    const { name, value } = event.target
    const oldConfig = monitorInfo.config
    const newConfig = { ...oldConfig, [name]: value }
    setMonitorInfo({ ...monitorInfo, config: newConfig })
  }

  const handleUpdateMonitor = () => {
    updateMonitor(monitorInfo, (result) => {
      if (result.status === 'success') {
        //history.push("/")
      }
    })
    onClose()
  }

  const handleNotificationChange = (event) => {
    const { id, checked } = event.target
    let newNotifications = monitorInfo.notifications

    if (checked) {
      newNotifications.push(id)
    } else {
      newNotifications = newNotifications.filter((item) => item !== id)
    }

    setMonitorInfo({ ...monitorInfo, notifications: newNotifications })
  }

  useEffect(() => {
    let newNotifications = monitorInfo.notifications
    monitorInfo.notifications.forEach((existingNotification) => {
      let found = false
      notifications.forEach((newNotification) => {
        if (found !== true) {
          if (newNotification._id === existingNotification) {
            found = true
          }
        }
      })
      if (!found) {
        // define new notifications as existing notifications where the item is not equal to our current item
        newNotifications = newNotifications.filter(
          (item) => item !== existingNotification
        )
      }
    })

    setMonitorInfo({ ...monitorInfo, notifications: newNotifications })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications])
  
  
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
          <ModalHeader>Monitor</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Name"
              isRequired={true}
              value={monitorInfo.name}
              onChange={handleInputChange}
              name="name"
            />

            <FormLabel>Interval</FormLabel>
            <Select
              placeholder="Interval"
              isRequired={true}
              value={monitorInfo.interval}
              onChange={handleInputChange}
              name="interval"
            >
              <option value="300">Every 5 mins</option>
              <option value="600">Every 10 mins</option>
              <option value="900">Every 15 mins</option>
              <option value="1800">Every 30 mins</option>
              <option value="3600">Every 60 mins</option>
            </Select>{' '}

            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Type"
              isRequired={true}
              value={monitorInfo.type}
              onChange={handleInputChange}
              name="type"

            >
              <option value="http">HTTP</option>
              <option value="keyword">HTTP with keyword</option>
            </Select>

            <FormLabel>Url</FormLabel>
            <Input
              type="text"
              placeholder="URL"
              isRequired={true}
              value={monitorInfo.config.httpUrl}
              onChange={handleConfigChange}
              name="httpUrl"
            />
            
            {monitorInfo.type === "keyword" &&
              <>
                <FormLabel>Keyword</FormLabel>
                <Input
                  type="text"
                  placeholder="Keyword"
                  isRequired={true}
                  value={monitorInfo.config.httpKeyword}
                  onChange={handleConfigChange}
                  name="httpKeyword"
                />
              </>
            }
            


              <FormLabel>Notification Agent(s)</FormLabel>
              {notifications.length > 0 ? null : <div>No notifiers configured</div>}
              {notifications &&
                notifications.map((notification, key) => {
                  return (
                    <div key={key}>
                      <Checkbox
                        colorScheme="purple"
                        isChecked={
                          monitorInfo.notifications.find(
                            (element) => element === notification._id
                          )
                            ? true
                            : false
                        }
                        id={notification._id}
                        name={notification.name}
                        onChange={handleNotificationChange}
                      >
                        {notification.name}{' '}
                        {notification.type === 'slack' ? (
                          <FontAwesomeIcon icon={faSlack} />
                        ) : (
                          <FontAwesomeIcon icon={faMailBulk} />
                        )}
                      </Checkbox>
                    </div>
                  )
                })}
              <br/>
              <FormLabel>Enable</FormLabel>
              <Checkbox
                colorScheme="purple"
                isRequired={true}
                isChecked={monitorInfo.enabled}
                onChange={handleCheckboxChange}
                name="enabled"
              >
                Enable Monitoring
              </Checkbox>
            </ModalBody>
            
            <ModalFooter>
            <Button colorScheme="purple" onClick={handleUpdateMonitor}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateMonitor

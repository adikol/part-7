import React from 'react'
import {useSelector} from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notificationMessage = useSelector(state => state.notifications)
    console.log('notificationMessage: ' ,  notificationMessage)
    if (!notificationMessage || !notificationMessage.message || !notificationMessage.message.length) {
      return null
    }
  
    return (
      <div className="container" >
        <Alert variant="success">
            {notificationMessage.message}
        </Alert>
      </div>
    )
  }

  export default Notification
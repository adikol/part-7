import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import loginService from './services/login'
import blogService from './services/blogs'
import { showMessage } from './reducers/notificationsReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
      event.preventDefault()    
      try {
        const user = await loginService.login({
          username, password,
        })
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        ) 
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        dispatch(showMessage({message:`Welcome ${user.name}`, error: false}))
        setTimeout(() => {
          dispatch(showMessage({message:'', error: false}))
        }, 5000)
      } catch (exception) {
        dispatch(showMessage({message:'Wrong credentials', error: true}))
        setTimeout(() => {
          dispatch(showMessage({message:'', error: true}))
        }, 5000)
      }
    }

    const handleSetUsername= (event) => setUsername(event.target.value)
    const handleSetPassword = (event) => setPassword(event.target.value)
  
   return (
     <div>
       <h2>Login</h2>
 
       <Form onSubmit={handleLogin}>
       <Form.Group>
          <Form.Label>username:</Form.Label>
           <Form.Control
             type="text"
             id='username'
             value={username}
             onChange={handleSetUsername}
           />         
          <Form.Label>password:</Form.Label>
           <Form.Control
             id='password'
             type="password"
             value={password}
             onChange={handleSetPassword}
           />
         <Button variant="primary" id="login-button" type="submit">login</Button>
         </Form.Group>
       </Form>
     </div>
   )
 }

 export default LoginForm
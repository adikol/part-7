import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import User from './components/User'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm.js'
import Togglable from './Togglable.js'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Users from './components/Users'
import {addUser} from './reducers/userReducer'
import {Switch, Route, Link} from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
 
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector( state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(addUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const logout = () => {
    console.log("logging out")
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(addUser(null))
  }

  const setUser = (user) => {
    dispatch(addUser(user))
  }
  
  const loginForm = () => {
    return (
      <div>
          <LoginForm setUser={setUser}/>
      </div>
    )
  }

  const blogForm = () => (
  <Togglable buttonLabel="new blog" hideLabel="cancel" hiddenItems=''>
    <BlogForm />
  </Togglable>
  )

  if(user === null)
  {
    return (
      <div>
        <h2>Blogs</h2>
       <Notification/>
       <h2>login to the application </h2>
       {loginForm()}
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  return (
    <div className="container">
      

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">


      <Nav.Link href="#" as="span">
        <Link style={padding} to="/blogs">blogs</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/users">users</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/create">create new</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/users">{user.name}</Link>
      </Nav.Link>
      <button type="submit" onClick={logout}>logout</button>
        </Nav>
        </Navbar.Collapse>
        </Navbar>

     <Notification />
        <h2>Blogs</h2>
          <Switch>
            <Route path='/create'>
              {blogForm()}
            </Route>
            <Route path='/blogs/:id'>
              <Blog/>
            </Route>
            <Route path='/users/:id'>
              <User/>
            </Route>
            <Route path='/blogs'>
              <Blogs />
            </Route>
            <Route path='/users'>
              <Users/>
            </Route>
            <Route path='/login'>
              {loginForm()}
            </Route>
            <Route path='/'>
              <Blogs/>
            </Route>
        </Switch>
        </div>
  )
}

export default App
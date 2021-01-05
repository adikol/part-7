import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { showMessage } from './reducers/notificationsReducer'
import { addBlog } from './reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const addNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const addNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const addNewUrl= (event) => {
    setNewUrl(event.target.value)
  }

  const createBlog = () => {
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    handleBlogCreate(newBlog)
  }

  const handleBlogCreate = async (newBlog) => {
    dispatch(addBlog(newBlog))
    dispatch(showMessage({message: `a new blog ${blogs[blogs.length - 1].title} by ${blogs[blogs.length - 1].author}`, error: false}))
  }
  
  return(
    <div>
    <h2>create new</h2>
    <Form onSubmit={createBlog}>
    <Form.Group>
    <Form.Label>title:</Form.Label>
      <Form.Control id='titleInput'
        type="text"
        value={title}
        onChange={addNewTitle}
      />
      author:
      <Form.Control id='authorInput'
        type="text"
        value={author}
        onChange={addNewAuthor}
      />
      url:
      <Form.Control id='urlInput'
        type="text"
        value={url}
        onChange={addNewUrl}
      />
      <Button variant="primary" id='submitButton' type="submit">create</Button>
      </Form.Group>
    </Form>
    </div>
  )
}

export default BlogForm
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {likeBlog} from '../reducers/blogsReducer'
import {initializeComments, addComment} from '../reducers/commentsReducer'
import {useRouteMatch} from 'react-router-dom'

const Blog = () => {
  const [newComment, setNewComment] = useState('') 
  const dispatch = useDispatch()
  const blogs = useSelector( state => state.blogs)
  const comments = useSelector( state => state.comments)
  const match = useRouteMatch('/blogs/:id')
  const blog = match 
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  
  useEffect(() => {
      if(blog)
        dispatch(initializeComments())
 }, [dispatch, blog])

    if (!blog) {
      return null
    }
  
  const handleCommentChanged = (event) => {
    setNewComment(event.target.value)
  }

  const submitComment = (event) => {
    event.preventDefault()
    event.target.value = ''
    const comment = {
      blogid: blog.id,
      comment: newComment
    }
    setNewComment('')
    dispatch(addComment(comment))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleLike = async () => {
    const newBlog = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    dispatch(likeBlog(blog.id, newBlog))
}

/*const handleDelete = async ({blog}) => {
  if(window.confirm(`Remove blog ${blog.title} by ${blog.author} ?)`))
  {
    dispatch(deleteBlog(blog.id))
  }
}*/

  return (

  <div style={blogStyle} className='blog'>
    <div>
   
    <h1>{blog.title} {blog.author}</h1>


    <a href={blog.url}>{blog.url}</a>
    <div>{blog.likes} likes  <button type="submit" onClick={handleLike}>like</button></div>
    <div>added by {blog.user ? blog.user.username : ''}</div>
    <h3>comments</h3>
    <ul>
      {comments.filter(comment => {
       return comment.blogid === blog.id
      }).map(c => <li key={c._id}>{c.comment}</li>)}
    </ul>
    <form onSubmit={submitComment}>
        <input value={newComment} onChange={handleCommentChanged}/>
        <button type="submit">add comment</button>
    </form>
    </div>
  </div>
)}

export default Blog

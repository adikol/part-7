
import blogsService from '../services/blogs'

export const deleteBlog = (id) => {
    return async dispatch => {
    await blogsService.deleteBlog(id)
    dispatch({
      type: "DELETE_BLOG",
      data: {id}
    })
  }
}

export const likeBlog = (id, newObject) => {
    return async dispatch => {
    const setObj = await blogsService.update(id, newObject)
    const likes = setObj.likes
    dispatch({
      type: "LIKE_BLOG",
      data: {id, likes}
    })
  }
}

export const addBlog = (content) => {
  return async dispatch => {
  const newBlog = await blogsService.create(content)
  dispatch({
    type: "NEW_BLOG",
    newBlog
  })
}
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    console.log('initializeBlogs: ' , blogs)
    dispatch({
      type: 'INIT_BLOG',
      data: blogs,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type)
  {
    case 'NEW_BLOG':
        return [...state, action.newBlog]
    case 'INIT_BLOG':
        return action.data
    case 'DELETE_BLOG':
        return state.filter(blog => blog.id !== action.data.id)
    case 'LIKE_BLOG':
        const blogToChange =  state.find(n => n.id === action.data.id)
        const changedBlog = {
        ...blogToChange,
        likes: action.data.likes
        }
        return state.map(blog => blog.id === action.data.id ? changedBlog : blog)
    default:
        return state
  }
}

export default reducer

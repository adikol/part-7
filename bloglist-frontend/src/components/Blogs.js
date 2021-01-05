import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {initializeBlogs} from '../reducers/blogsReducer'
import {Link} from "react-router-dom"
import { Table } from 'react-bootstrap'

const Blogs = () =>  {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector( state => state.user)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
      }, [user, dispatch])

    blogs.sort((prevblog, blog) => (blog.likes > prevblog.likes) ? 1 : ((prevblog.likes > blog.likes) ? -1 : 0))
    return(
      <div>
        <Table striped>
        <tbody>
        {blogs.map(blog => {

            if(blog === null)
                return ''

            return(
                <tr key={blog.id}>
                    <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </td>
                    <td>
                        {blog.author}
                    </td>
                </tr>
            )
        })
      }
      </tbody>
      </Table>
      </div>
    )
  }

  export default Blogs
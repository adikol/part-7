import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {initializeUsers} from '../reducers/usersReducer'
import {Link} from "react-router-dom"

const UsersDetail = ({user}) => {
    return (
        <tbody>
        <tr>
            <td rowSpan="1"></td>
            <th colSpan="1">blogs created</th>
        </tr>
        <tr>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length} </td>
        </tr>
        </tbody>
    )
}

const Users = () =>  {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('fetching users')
        dispatch(initializeUsers())
      }, [dispatch])

      return(
        <div>
            <h1>Users</h1>
            {users.map(user =>
            {
                if(user === null)
                    return ''
                
                return(
                    <div key={user.id}>
                        <table>
                            <UsersDetail user={user}/>     
                        </table>                  
                    </div>
                )
            })
        }
        </div>
      )
}

export default Users
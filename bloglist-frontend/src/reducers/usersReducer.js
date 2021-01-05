import usersService from '../services/users'

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USERS':
            state = action.users
            return state
        case 'GET_USERS':
            return state
        default:
            return state
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        console.log('initializeUsers: ' , users)
        dispatch({
            type: 'INIT_USERS',
            users
        })
    }
} 

export default usersReducer
const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'ADD_USER':
            state = action.user
            return state
        default:
            return state
    }
}

export const addUser = (user) => {

    console.log('user: ' , user)

    return {
        type:'ADD_USER',
        user
    }
}

export default userReducer
const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SHOW_MESSAGE':
            return action.message
        default:
            return state
    }
}

export const showMessage = (message) => {

    return {
        type:'SHOW_MESSAGE',
        message
    }
}

export default notificationReducer
import commentsService from '../services/comments'

const commentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_COMMENTS':
            state = action.comments
            return state ? state : []
        case 'ADD_COMMENTS':                    
            console.log('action.data.obj: '  , action.data.obj)
            return state.concat(action.data.obj)
        default:
            return state
    }
}

export const initializeComments = () => {
    return async dispatch => {
        const comments = await commentsService.getAll()
        console.log('initializeComments: ' , comments)
        dispatch({
            type: 'INIT_COMMENTS',
            comments
        })
    }
}

export const addComment = (comment) => {
    return async dispatch => {
      const obj = await commentsService.addComment(comment)
        console.log('addComment: ' , comment)
        dispatch({
            type: 'ADD_COMMENTS',
            data: {obj}
        })
    }
}

export default commentsReducer
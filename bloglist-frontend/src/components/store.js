import blogsReducer from '../reducers/blogsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationsReducer from '../reducers/notificationsReducer'
import userReducer from '../reducers/userReducer'
import usersReducer from '../reducers/usersReducer'
import commentsReducer from '../reducers/commentsReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    blogs: blogsReducer,
    notifications: notificationsReducer,
    user: userReducer,
    users: usersReducer,
    comments: commentsReducer
  })

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
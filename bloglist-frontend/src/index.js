import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './components/store'
import {BrowserRouter as Router} from "react-router-dom"

const renderApp = () => {
    ReactDOM.render(<Provider store={store}>
        <Router>
            <App />
        </Router>
        </Provider>,
    document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

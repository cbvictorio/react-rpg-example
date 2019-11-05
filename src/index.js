import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { App } from '../App'
import { Store } from './store/'


const container = document.getElementById('app')

ReactDOM.render(
    <Provider store={Store}>
        <App /> 
    </Provider>
    , 
    container
)

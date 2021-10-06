import React from 'react'
import {App} from './components/App'
import {render} from 'react-dom'
import {compose, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import allReducers from './reducers/index.js'
import {BrowserRouter} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';

axios.defaults.withCredentials = true;

const store = createStore(allReducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

const app = (
    <CookiesProvider>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </CookiesProvider>
);
render (app, document.getElementById('root'));

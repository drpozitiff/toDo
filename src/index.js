import React from 'react'
import Articles from './components/Articles'
import {render} from 'react-dom'
import {compose, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {forbiddenWordsMiddleware} from "./components/reduxApp/redux/middleware";
import allReducers from './reducers/index.js'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WebPage from './components/WebPage'
import ReduxApp from "./components/reduxApp/ReduxApp";


const store = createStore(allReducers, compose(
    applyMiddleware(thunk, forbiddenWordsMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route exact path="/" component={() => <Articles />} />
                <Route path="/WebPage" component={WebPage} />
                <Route path="/ReduxApp" component={ReduxApp} />
            </Switch>
        </Provider>
    </BrowserRouter>
);
render (app, document.getElementById('root'));

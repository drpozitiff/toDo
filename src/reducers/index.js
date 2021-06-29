import {combineReducers} from 'redux';
import cars from './cars';
import articles from './articles';
import {postsReducer} from "../components/reduxApp/redux/postsReducer";
import {appReducer} from "../components/reduxApp/redux/appReducer";

const allReducers = combineReducers ({
    cars,
    articles,
    posts: postsReducer,
    app: appReducer
});

export default allReducers
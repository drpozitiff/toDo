import {combineReducers} from 'redux';
import cars from './cars';
import articles from './articles';
import users from './users';

const allReducers = combineReducers ({
    cars,
    articles,
    users
});

export default allReducers
import {combineReducers} from 'redux';
import fish from './fish';
import articles from './articles';
import users from './users';

const allReducers = combineReducers ({
    fish,
    articles,
    users
});

export default allReducers
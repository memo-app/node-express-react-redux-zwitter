// Imports
import { combineReducers } from 'redux';

// App Imports
import user from './user';
import { memos, memo } from './memos';
import { categories } from './categories';

export default combineReducers({
    user,
    memos,
    memo,
    categories
});
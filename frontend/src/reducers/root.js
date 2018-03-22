// Imports
import { combineReducers } from 'redux';

// App Imports
import user from './user';
import { memos, memo } from './memos';

export default combineReducers({
    user,
    memos,
    memo
});
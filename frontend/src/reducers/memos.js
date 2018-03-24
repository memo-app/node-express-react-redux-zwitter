// Imports
import update from 'immutability-helper';

// App Imports
import { SET_MEMOS, FETCH_MEMOS_BEGIN, SET_MEMO, FETCH_MEMO_BEGIN, REMOVE_MEMO_BEGIN, REMOVE_MEMO_SUCCESS, REMOVE_MEMO_FAIL } from '../actions/memo';

export function memos(state = { list: [], error: false, loading: false }, action = {}) {
    switch (action.type) {

        case FETCH_MEMOS_BEGIN:
            return update(state, {
                $merge: {
                    list: [],
                    error: false,
                    loading: true
                }
            });

        case SET_MEMOS:
            return update(state, {
                $merge: {
                    list: action.memos,
                    error: false,
                    loading: false
                }
            });


        case REMOVE_MEMO_BEGIN:
            return update(state, {
                $merge: {
                    error: false,
                    loading: true
                }
            });

        case REMOVE_MEMO_SUCCESS:
            console.log(state, action);
            return update(state, {
                $merge: {
                    loading: false,
                    list: state.list.filter(t => t._id !== action.memoId)
                }
            });

        default:
            return state;
    }
}

export function memo(state = { details: {}, error: false, loading: false }, action = {}) {
    switch (action.type) {

        case FETCH_MEMO_BEGIN:
            return update(state, {
                $merge: {
                    details: {},
                    error: false,
                    loading: true
                }
            });

        case SET_MEMO:
            return update(state, {
                $merge: {
                    details: action.memo,
                    error: false,
                    loading: false
                }
            });

        case REMOVE_MEMO_BEGIN:
            return update(state, {
                $merge: {
                    error: false,
                    loading: true
                }
            });

        case REMOVE_MEMO_SUCCESS:
            return update(state, {
                $merge: {
                    details: { deleted: true },
                    deleted: true,
                    error: false,
                    loading: false
                }
            });

        case REMOVE_MEMO_FAIL:
            return update(state, {
                $merge: {
                    loading: false,
                    error: true
                }
            })

        default:
            return state;
    }
}
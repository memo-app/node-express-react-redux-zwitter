// Imports
import update from 'immutability-helper';

// App Imports
import { FETCH_CATEGORIES_BEGIN, FETCH_CATEGORIES_SUCCESS } from '../actions/category';

export function categories(state = { list: [], error: false, loading: false }, action = {}) {
    switch (action.type) {

        case FETCH_CATEGORIES_BEGIN:
            return update(state, {
                $merge: {
                    categories: [],
                    error: false,
                    loading: true
                }
            });

        case FETCH_CATEGORIES_SUCCESS:
            return update(state, {
                $merge: {
                    categories: action.categories,
                    error: false,
                    loading: false
                }
            });

        default:
            return state;
    }
}
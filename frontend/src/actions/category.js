// App Imports
import config from '../config';

export const FETCH_CATEGORIES_BEGIN = 'FETCH_CATEGORIES_BEGIN';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export function fetchCategories() {
    const token = localStorage.getItem('token');
    
    return dispatch => {
        dispatch({
            type: FETCH_CATEGORIES_BEGIN
        });

        return fetch(`${config.url.api}categories`, {
            headers: {
                'x-access-token': token
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (response) {
                    dispatch({
                        type: FETCH_CATEGORIES_SUCCESS,
                        categories: response.data
                    });
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", response.status);
            }
        }, function (e) {
            console.log("Fetch failed!", e);
        });
    }
}
// App Imports
import config from '../config';

export const SET_MEMOS = 'SET_MEMOS';
export const FETCH_MEMOS_BEGIN = 'FETCH_MEMOS_BEGIN';
export const FETCH_MEMOS_BY_CATEGORY_BEGIN = 'FETCH_MEMOS_BY_CATEGORY_BEGIN';
export const SET_MEMO = 'SET_MEMO';
export const FETCH_MEMO_BEGIN = 'FETCH_MEMO_BEGIN';
export const REMOVE_MEMO_BEGIN = 'REMOVE_MEMO_BEGIN';
export const REMOVE_MEMO_SUCCESS = 'REMOVE_MEMO_SUCCESS';
export const REMOVE_MEMO_FAIL = 'REMOVE_MEMO_FAIL';

export function fetchMemos() {
    const token = localStorage.getItem('token');

    return dispatch => {
        dispatch({
            type: FETCH_MEMOS_BEGIN
        });

        return fetch(`${ config.url.api }memos`, {
            headers: {
                'x-access-token': token
            }
        }).then(function(response) {
            if (response.ok) {
                response.json().then(function(response) {
                    dispatch({
                        type: SET_MEMOS,
                        memos: response.data
                    });
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", response.status);
            }
        }, function(e) {
            console.log("Fetch failed!", e);
        });
    }
}

export function fetchMemosByCategory(category) {
    const token = localStorage.getItem('token');

    return dispatch => {
        dispatch({
            type: FETCH_MEMOS_BY_CATEGORY_BEGIN
        });

        return fetch(`${ config.url.api }memos/category/${category}`, {
            headers: {
                'x-access-token': token
            }
        }).then(function(response) {
            if (response.ok) {
                response.json().then(function(response) {
                    dispatch({
                        type: SET_MEMOS,
                        memos: response.data
                    });
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", response.status);
            }
        }, function(e) {
            console.log("Fetch failed!", e);
        });
    }
}

export function fetchMemo(memoId) {
    const token = localStorage.getItem('token');

    return dispatch => {
        dispatch({
            type: FETCH_MEMO_BEGIN
        });

        return fetch(`${ config.url.api }memos/${ memoId }`, {
            headers: {
                'x-access-token': token
            }
        }).then(function(response) {
            if (response.ok) {
                response.json().then(function(response) {
                    if(response.success) {
                        dispatch({
                            type: SET_MEMO,
                            memo: response.data
                        });
                    }
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", response.status);
            }
        }, function(e) {
            console.log("Fetch failed!", e);
        });
    }
}

export function postMemo(memo) {
    const token = localStorage.getItem('token');

    return dispatch => {
        return fetch(`${ config.url.api }memos`, {
            method: 'post',

            body: JSON.stringify(memo),

            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
            .then(response => response.json())
    }
}

export function deleteMemo(memoId) {
    const token = localStorage.getItem('token');

    return dispatch => {
        dispatch({
            type: REMOVE_MEMO_BEGIN
        });
        
        return fetch(`${ config.url.api }memos/${memoId}`, {
            method: 'delete',

            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(function (response) {
                    if (response.success) {
                        dispatch({
                            type: REMOVE_MEMO_SUCCESS,
                            memoId: memoId
                        });
                    } else {
                        dispatch({
                            type: REMOVE_MEMO_FAIL
                        });
                    }
                });
            } else {
                console.log("Delete failed with status " + response.status);
            }
        })
    }
}
// App Imports
import config from '../config';

export const SET_TWEETS = 'SET_TWEETS';
export const FETCH_TWEETS_BEGIN = 'FETCH_TWEETS_BEGIN';
export const SET_TWEET = 'SET_TWEET';
export const FETCH_TWEET_BEGIN = 'FETCH_TWEET_BEGIN';
export const REMOVE_TWEET_BEGIN = 'REMOVE_TWEET_BEGIN';
export const REMOVE_TWEET_SUCCESS = 'REMOVE_TWEET_SUCCESS';
export const REMOVE_TWEET_FAIL = 'REMOVE_TWEET_FAIL';

export function fetchTweets() {
    return dispatch => {
        dispatch({
            type: FETCH_TWEETS_BEGIN
        });

        return fetch(`${ config.url.api }tweets`).then(function(response) {
            if (response.ok) {
                response.json().then(function(response) {
                    dispatch({
                        type: SET_TWEETS,
                        tweets: response.data
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

export function fetchTweet(tweetId) {
    return dispatch => {
        dispatch({
            type: FETCH_TWEET_BEGIN
        });

        return fetch(`${ config.url.api }tweets/${ tweetId }`).then(function(response) {
            if (response.ok) {
                response.json().then(function(response) {
                    if(response.success) {
                        dispatch({
                            type: SET_TWEET,
                            tweet: response.data
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

export function postTweet(tweet) {
    const token = localStorage.getItem('token');

    return dispatch => {
        return fetch(`${ config.url.api }tweets/add`, {
            method: 'post',

            body: JSON.stringify(tweet),

            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
            .then(response => response.json())
    }
}

export function deleteTweet(tweetId) {
    const token = localStorage.getItem('token');

    return dispatch => {
        dispatch({
            type: REMOVE_TWEET_BEGIN
        });
        
        return fetch(`${ config.url.api }tweets/${tweetId}`, {
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
                            type: REMOVE_TWEET_SUCCESS,
                            tweetId: tweetId
                        });
                    } else {
                        dispatch({
                            type: REMOVE_TWEET_FAIL
                        });
                    }
                });
            } else {
                console.log("Delete failed with status " + response.status);
            }
        })
    }
}
// Imports
import update from 'immutability-helper';

// App Imports
import { SET_TWEETS, FETCH_TWEETS_BEGIN, SET_TWEET, FETCH_TWEET_BEGIN, REMOVE_TWEET_BEGIN, REMOVE_TWEET_SUCCESS, REMOVE_TWEET_FAIL } from '../actions/tweet';

export function tweets(state = { list: [], error: false, loading: false }, action = {}) {
    switch (action.type) {

        case FETCH_TWEETS_BEGIN:
            return update(state, {
                $merge: {
                    list: [],
                    error: false,
                    loading: true
                }
            });

        case SET_TWEETS:
            return update(state, {
                $merge: {
                    list: action.tweets,
                    error: false,
                    loading: false
                }
            });


        case REMOVE_TWEET_BEGIN:
            return update(state, {
                $merge: {
                    error: false,
                    loading: true
                }
            });

        case REMOVE_TWEET_SUCCESS:
            console.log(state, action);
            return update(state, {
                $merge: {
                    loading: false,
                    list: state.list.filter(t => t._id !== action.tweetId)
                }
            });

        default:
            return state;
    }
}

export function tweet(state = { details: {}, error: false, loading: false }, action = {}) {
    switch (action.type) {

        case FETCH_TWEET_BEGIN:
            return update(state, {
                $merge: {
                    details: {},
                    error: false,
                    loading: true
                }
            });

        case SET_TWEET:
            return update(state, {
                $merge: {
                    details: action.tweet,
                    error: false,
                    loading: false
                }
            });

        case REMOVE_TWEET_BEGIN:
            return update(state, {
                $merge: {
                    error: false,
                    loading: true
                }
            })

        case REMOVE_TWEET_SUCCESS:
            return update(state, {
                $merge: {
                    details: { deleted: true },
                    deleted: true,
                    error: false,
                    loading: false
                }
            })

        default:
            return state;
    }
}
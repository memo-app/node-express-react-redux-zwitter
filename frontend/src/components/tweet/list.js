// Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

// UI Imports
import Snackbar from 'material-ui/Snackbar';


import Tweet from './Tweet';

class TweetList extends Component {
    render() {
        return (
            <div>
                {!(this.props.tweets instanceof Array) ?
                    <p>No tweets to show.</p> :
                    this.props.tweets.map(tweet => <Tweet key={tweet._id} {...tweet} />)}
            </div>
        );
    }

}

TweetList.propTypes = {
    tweets: PropTypes.array.isRequired
};

export default TweetList;
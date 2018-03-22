// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App Imports
import { fetchTweets } from '../../../actions/tweet';
import Loading from '../../loading';
import TweetList from '../list';

// UI Imports
import { Card, CardTitle } from 'material-ui/Card';

class TweetSearchResults extends Component {
    componentDidMount() {
        //this.props.fetchTweets();
    }

    render() {
        const numResults = this.props.results.length;
        return (
            <div>
                <h3> Tweet Search Results </h3>
                <p>{numResults} results found for term <i>{this.props.searchQuery}</i> </p>
                {(numResults > 0) && <TweetList tweets={this.props.results} hideDeleteButton={true} />}
            </div>
        );
    }
}

export default connect()(TweetSearchResults);
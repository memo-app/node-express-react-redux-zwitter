// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App Imports
//import { fetchTweets } from '../../actions/tweet';
import Loading from '../../loading';

class TweetSearchBox extends Component {
    componentDidMount() {
        //this.props.fetchTweets();
    }

    render() {
        return (
            <section>
                <label> Search Term </label>
                <input type="text" value={this.props.searchQuery} onChange={this.props.setSearchQuery} />
                <br />
            </section>
        );
    }
}

export default connect()(TweetSearchBox);
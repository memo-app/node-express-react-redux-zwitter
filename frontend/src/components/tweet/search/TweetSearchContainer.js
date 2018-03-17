// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App Imports
//import { fetchTweets } from '../../actions/tweet';
import Loading from '../../loading';
import TweetSearchBox from './TweetSearchBox';
import TweetSearchResults from './TweetSearchResults';
import config from '../../../config';

class TweetSearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            isLoading: false,
            results: []
        };
        this.setSearchQuery = this.setSearchQuery.bind(this);
    }

    setSearchQuery({ target }) {
        this.setState({ isLoading: true, searchQuery: target.value });
        return fetch(`${config.url.api}tweets/search?searchTerm=${target.value}`).then(response => {
            if (response.ok) {
                response.json().then(response => {
                    this.setState({ isLoading: false, results: response.data });
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", response.status);
            }
        }, function (e) {
            console.log("Fetch failed!", e);
        });
    }




    componentDidMount() {
        //this.props.fetchTweets();
    }




    render() {
        return (
            <section>
                <h2>Tweet search</h2>

                <TweetSearchBox setSearchQuery={this.setSearchQuery} searchQuery={this.state.searchQuery} />
                <TweetSearchResults {...this.state} />

                <br />
            </section>
        );
    }
}

export default connect()(TweetSearchContainer);
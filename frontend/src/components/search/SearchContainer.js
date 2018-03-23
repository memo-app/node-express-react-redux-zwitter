// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App Imports
//import { fetchmemos } from '../../actions/memo';
import Loading from '../loading';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import config from '../../config';

class SearchContainer extends Component {
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
        return fetch(`${config.url.api}memos/search?searchTerm=${target.value}`).then(response => {
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
        //this.props.fetchMemos();
    }

    render() {
        return (
            <section>
                <h2>Memo search</h2>

                <br />
                <div>
                <SearchBox setSearchQuery={this.setSearchQuery} searchQuery={this.state.searchQuery} />
                </div>
                <br />

                <SearchResults {...this.state} />

                <br />
            </section>
        );
    }
}

export default connect()(SearchContainer);
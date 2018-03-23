// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App Imports
import { fetchMemo } from '../../actions/memo';
import Loading from '../loading';
import MemoList from '../memo/list';

// UI Imports
import { Card, CardTitle } from 'material-ui/Card';

class memoSearchResults extends Component {
    componentDidMount() {
        //this.props.fetchMemos();
    }

    render() {
        const numResults = this.props.results.length;
        return (
            this.props.searchQuery ?
            <div>
                <p>{numResults} results found for term <i>{this.props.searchQuery}</i> </p>
                <br />
                {(numResults > 0) && <MemoList memos={this.props.results} hideDeleteButton={true} />}
            </div>
            : null
        );
    }
}

export default connect()(memoSearchResults);
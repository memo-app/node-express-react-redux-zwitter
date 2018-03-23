// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// UI Imports
import TextField from 'material-ui/TextField';

// App Imports
//import { fetchMemo } from '../../actions/memo';

import Loading from '../loading';

class SearchBox extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <input type="text" placeholder="Search memos ..." value={this.props.searchQuery} onChange={this.props.setSearchQuery} />
        );
    }
}

export default connect()(SearchBox);
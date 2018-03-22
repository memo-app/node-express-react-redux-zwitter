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
            <TextField
                fullWidth={true}
                inputStyle={{ color: 'white' }}
                hintText="Search memos ..."
                value={this.props.searchTerm}
            />
        );
    }
}

export default connect()(SearchBox);
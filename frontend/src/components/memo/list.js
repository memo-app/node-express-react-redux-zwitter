// Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

// UI Imports
import Snackbar from 'material-ui/Snackbar';

// App Imports
import Memo from './memo';

class MemoList extends Component {
    render() {
        return (
            <div>
                {!(this.props.memos instanceof Array) ?
                    <p>No memos to show.</p> :
                    this.props.memos.map(memo =>
                        <Memo
                            key={memo._id} {...memo}
                            hideDeleteButton={this.props.hideDeleteButton}
                            expandDetails={this.props.expandDetails}
                        />)}
            </div>
        );
    }

}

MemoList.propTypes = {
    memos: PropTypes.array.isRequired
};

export default MemoList;
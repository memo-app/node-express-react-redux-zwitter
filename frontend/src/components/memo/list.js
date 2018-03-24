// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// App Imports
import Memo from './memo';

class MemoList extends Component {
    render() {
        return (
            <div>
                {!(this.props.memos instanceof Array) || this.props.memos.length === 0 ?
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
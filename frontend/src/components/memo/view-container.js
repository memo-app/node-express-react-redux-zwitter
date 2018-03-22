// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App Imports
import { fetchMemo } from '../../actions/memo';
import Loading from '../loading';
import MemoView from './view';

class MemoViewContainer extends Component {
    componentDidMount() {
        this.props.fetchMemo(this.props.match.params.memoId);
    }

    render() {
        return (
            <section>
                <h2><span role="img">💭</span> Memo</h2>

                <br/>

                { this.props.memo.loading ? <Loading /> : <MemoView memo={ this.props.memo.details } /> }
            </section>
        );
    }
}

MemoViewContainer.propTypes = {
    memo: PropTypes.object.isRequired,
    fetchMemo: PropTypes.func.isRequired
};

function memoState(state) {
    return {
        memo: state.memo
    }
}

export default connect(memoState, { fetchMemo })(MemoViewContainer);
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App Imports
import { fetchMemos } from '../../actions/memo';
import Loading from '../loading';
import MemoList from './list';

class MemoListContainer extends Component {
    
    componentWillMount() {
        if (this.props.user.isAuthenticated) {
            this.props.fetchMemos();
        }
    }

    render() {
        return (
            <section>
                <h2><span role="img" aria-label="">💭</span> Memos</h2>

                <br/>

                { this.props.memos.loading ? <Loading /> : <MemoList memos={ this.props.memos.list } /> }
            </section>
        );
    }
}

MemoListContainer.propTypes = {
    memos: PropTypes.object.isRequired,
    fetchMemos: PropTypes.func.isRequired
};

function memosState(state) {
    return {
        user: state.user,
        memos: state.memos
    }
}

export default connect(memosState, { fetchMemos })(MemoListContainer);
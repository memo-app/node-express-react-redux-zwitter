// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App Imports
import { fetchMemosByCategory } from '../../actions/memo';
import Loading from '../loading';
import MemoList from './list';

class MemoListByCategoryContainer extends Component {
    componentWillMount() {
        this.update(this.props.match.params.category);
    }

    componentWillUpdate(nextProps) {
        if (this.props.match.params.category !== nextProps.match.params.category) {
            this.update(nextProps.match.params.category);
        }
    }

    update(category) {
        this.props.fetchMemosByCategory(category);
    }

    render() {
        return (
            <section>
                <h2><span role="img" aria-label="">💭</span> {this.props.match.params.category}</h2>

                <br />

                {this.props.memos.loading ? <Loading /> : <MemoList memos={this.props.memos.list} />}
            </section>
        );
    }
}

MemoListByCategoryContainer.propTypes = {
    memos: PropTypes.object.isRequired,
    fetchMemosByCategory: PropTypes.func.isRequired
};

function memosState(state) {
    return {
        memos: state.memos
    }
}

export default connect(memosState, { fetchMemosByCategory })(MemoListByCategoryContainer);
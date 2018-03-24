// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// UI Imports
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500, red500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';
import { Card, CardText } from 'material-ui/Card';

// App Imports
import { postMemo } from '../../actions/memo';
import { fetchCategories } from '../../actions/category';
import Loading from '../loading';

class MemoAdd extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleAddCategory = this.handleAddCategory.bind(this);
        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);

        this.state = {
            memoId: '',
            link: '',
            title: '',
            categories: [],
            description: '',
            isLoading: false,
            notification: false,
            viewMemo: false,
            error: ''
        };
    }

    componentWillMount() {
        this.props.fetchCategories();
    }

    onSubmit(event) {
        event.preventDefault();

        console.log('E - submit #form-memo');

        let memo = {
            title: this.state.title,
            description: this.state.description,
            link: this.state.link, 
            categories: this.state.categories
        };

        this.setState({ isLoading: true });

        if (memo.title !== '' && memo.link !== '') {
            this.props.postMemo(memo).then((response) => {
                if (response.success) {
                    this.setState({
                        isLoading: false,
                        notification: true,
                        title: '',
                        description: '',
                        link: '',
                        categories: [],
                        error: '',
                        memoId: response.data.memoId
                    });
                } else {
                    this.setState({ isLoading: false, error: response.errors[0].message });
                }
            });
        } else {
            this.setState({ isLoading: false, error: 'Please supply link and title for the memo.', notification: false });
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleAddCategory(category) {
        this.setState({
            categories: [...this.state.categories, category.toLowerCase()]
        });
    }

    handleDeleteCategory(category, index) {
        this.setState({
            categories: this.state.categories.slice().filter(c => c !== category)
        });
    }

    render() {
        return (
            <section>
                <h2><span role="img" aria-label="">💭</span> Add a memo</h2>

                <br />

                {this.state.error ? <Card><CardText color={red500}>{this.state.error}</CardText></Card> : ''}

                {this.state.message ? <Card><CardText color={blue500}>{this.state.message}</CardText></Card> : ''}

                <form id="form-memo" onSubmit={this.onSubmit}>

                    <TextField
                        name="link"
                        value={this.state.link}
                        onChange={this.onChange}
                        floatingLabelText="Link"
                        multiLine={false}
                        rows={1}
                        fullWidth={true}
                    />

                    <TextField
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                        floatingLabelText="Title"
                        multiLine={false}
                        rows={1}
                        fullWidth={true}
                    />

                    <ChipInput
                        name="categories"
                        floatingLabelText="Categories"
                        dataSource={this.props.loading ? [] : this.props.categories}
                        value={this.state.categories}
                        fullWidth={true}
                        onRequestAdd={(category) => this.handleAddCategory(category)}
                        onRequestDelete={(category, index) => this.handleDeleteCategory(category, index)}
                    />

                    <TextField
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        floatingLabelText="Description"
                        multiLine={true}
                        rows={2}
                        fullWidth={true}
                    />

                    <br />
                    <br />

                    {this.state.isLoading ? <Loading /> : <RaisedButton label="🐤 Submit" type="submit" backgroundColor={blue500} labelColor="#ffffff" />}
                </form>

                <Snackbar
                    open={this.state.notification}
                    message="memo has been posted"
                    autoHideDuration={4000}
                    action="View memo"
                    onActionClick={() => (this.setState({ viewMemo: true }))}
                />

                {this.state.viewMemo ? <Redirect to={`/memo/${this.state.memoId}`} /> : ''}
            </section>
        )
    }
}

MemoAdd.propTypes = {
    postMemo: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired
};

function categoriesState(state) {
    return state.categories;
}

export default connect(categoriesState, { postMemo, fetchCategories })(MemoAdd);
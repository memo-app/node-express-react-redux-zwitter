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
import { Card, CardText } from 'material-ui/Card';

// App Imports
import { postMemo } from '../../actions/memo';
import AuthRedirect from './../user/auth-redirect';
import Loading from '../loading';

class MemoAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            isLoading: false,
            error: '',
            notification: false,
            viewMemo: false,
            memoId: ''
        };
    }

    onSubmit(event) {
        event.preventDefault();

        console.log('E - submit #form-memo');

        this.setState({ isLoading: true });

        let input = {};
        input.text = this.state.text;

        if(input.text !=='') {
            this.props.postMemo(input).then((response) => {
                if(response.success) {
                    this.setState({ isLoading: false, notification: true, text: '', error: '', memoId: response.data.memoId });
                } else {
                    this.setState({ isLoading: false, error: response.errors[0].message });
                }
            });
        } else {
            this.setState({ isLoading: false, error: 'memo cannot be empty.', notification: false });
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <section>
                <h2>💭 Save a memo</h2>

                <br/>

                { this.state.error ? <Card><CardText color={ red500 }>{ this.state.error }</CardText></Card> : '' }

                { this.state.message ? <Card><CardText color={ blue500 }>{ this.state.message }</CardText></Card> : '' }

                <form id="form-memo" onSubmit={ this.onSubmit.bind(this) }>
                    <TextField
                        name="text"
                        value={ this.state.text }
                        onChange={ this.onChange.bind(this) }
                        floatingLabelText="Memo content"
                        multiLine={ true }
                        rows={1}
                        fullWidth={ true }
                    />

                    <br/>
                    <br/>

                    { this.state.isLoading ? <Loading /> : <RaisedButton label="🐤 Submit" type="submit" backgroundColor={ blue500 } labelColor="white" /> }
                </form>

                <Snackbar
                    open={ this.state.notification }
                    message="memo has been posted"
                    autoHideDuration={4000}
                    action="View memo"
                    onActionClick={ () => ( this.setState({ viewMemo: true }) ) }
                />

                { this.state.viewMemo ? <Redirect to={ `/memo/${ this.state.memoId }` } /> : '' }

                <AuthRedirect />
            </section>
        )
    }
}

MemoAdd.propTypes = {
    postMemo: PropTypes.func.isRequired
};

export default connect(null, { postMemo })(MemoAdd);
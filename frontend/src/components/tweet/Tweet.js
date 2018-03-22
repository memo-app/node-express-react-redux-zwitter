// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';

// UI Imports
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

// App imports
import { deleteTweet } from '../../actions/tweet';
import Loading from '../loading';

class TweetView extends Component {
    constructor() {
        super();
        this.delete = this.delete.bind(this);
    }
    delete() {
        this.props.deleteTweet(this.props._id);
    }
    render() {
        return (
            <Card>
                {this.props.deleted && <Redirect to="/" />}
                <Link to={`/tweet/${this.props._id}`}><CardTitle title={this.props.text} subtitle={`${moment(this.props.createdAt).fromNow()} by ${this.props.userId}`} /></Link>
                <CardActions>
                    <FlatButton label="Delete" secondary onClick={this.delete} />
                </CardActions>
            </Card>
        );
    }
}

export default connect(null, { deleteTweet })(TweetView);
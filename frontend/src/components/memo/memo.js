// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';

// UI Imports
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

// App imports
import { deleteMemo } from '../../actions/memo';
import Loading from '../loading';
import Categories from './categories';

class Memo extends Component {
    constructor() {
        super();
        this.delete = this.delete.bind(this);
    }
    delete() {
        this.props.deleteMemo(this.props._id);
    }
    render() {
        const isExpandable = this.props.description && this.props.description.length > 0
            && !this.props.expandDetails;
        return (
            <Card>
                {this.props.deleted && <Redirect to="/" />}

                {this.props.categories && this.props.categories.length > 0 &&
                    <CardText style={{ float: 'right', marginRight: '25px' }}>
                        <Categories list={this.props.categories} />
                    </CardText>}

                <CardHeader
                    title={this.props.title}
                    subtitle={`${moment(this.props.createdAt).fromNow()}`}
                    actAsExpander={isExpandable}
                    showExpandableButton={isExpandable}
                />

                {this.props.description &&
                    <CardText expandable={isExpandable}>
                        {this.props.description}
                    </CardText>}

                <CardText>
                    <a href={`/link/${this.props._id}`}>{this.props.link}</a>
                </CardText>

                <CardActions>
                    <FlatButton label="Copy link" primary />
                    {!this.props.hideDeleteButton &&
                        <FlatButton label="Delete" secondary onClick={this.delete} />}
                </CardActions>
            </Card>
        );
    }
}

export default connect(null, { deleteMemo })(Memo);
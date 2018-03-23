// Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// UI Imports
import Chip from 'material-ui/Chip';

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.styles = {
            chip: {
                margin: 4,
                cursor: 'pointer',
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }
    render() {
        return (
            <div style={this.styles.wrapper}>
                {this.props.list.map(item =>
                    <Link to={`/memos/category/${item}`}>
                        <Chip key={item} style={this.styles.chip}>{item}</Chip>
                    </Link>
                )}
            </div>
        );
    }
}
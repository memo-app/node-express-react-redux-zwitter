// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI Imports
import SearchIcon from 'material-ui/svg-icons/action/search';

// App Imports
//import { fetchMemo } from '../../actions/memo';
//import Loading from '../loading';

// CSS Imports
import './searchBox.css';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{ width: '440px', display: 'inline-flex' }}>
                <div className="search-box">
                    <div className="textbox">
                        <input type="text"
                            name="search"
                            value={this.props.searchQuery}
                            ref={f => this._searchBox = f}
                            placeholder="Search"
                            autoComplete="off"
                            onChange={this.props.setSearchQuery}
                            className="auto-expand" />
                    </div>
                    <button className="search-button">
                        <SearchIcon />
                    </button>
                </div>
            </form>
        );
    }
}

export default connect()(SearchBox);
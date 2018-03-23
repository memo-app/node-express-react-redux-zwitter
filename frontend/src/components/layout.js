// Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// UI Imports
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';

// App Imports
import SearchBox from './search/SearchBox';
import UserButtonLogin from './user/button/login';
import UserButtonLogged from './user/button/logged';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    handleDrawerToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });

    render() {
        const { isAuthenticated } = this.props.user;

        return (
            <div>
                <AppBar
                    title={<div>
                        <span style={{ marginRight: '20px' }}>MemoApp</span>
                        <SearchBox searchTerm={this.state.searchTerm} />
                    </div>}
                    onLeftIconButtonClick={this.handleDrawerToggle}
                    iconElementRight={isAuthenticated ? <UserButtonLogged /> : <UserButtonLogin />}
                />

                <Drawer
                    docked={false}
                    open={this.state.drawerOpen}
                    onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
                >
                    <MenuItem onTouchTap={this.handleDrawerToggle} containerElement={<Link to="/" />}>🏠 Home</MenuItem>
                    <MenuItem onTouchTap={this.handleDrawerToggle} containerElement={<Link to="/search" />}>🔍 Search</MenuItem>
                    <MenuItem onTouchTap={this.handleDrawerToggle} containerElement={<Link to="/about" />}>ℹ️ About</MenuItem>

                    <List>
                        <Subheader>Categories</Subheader>
                        <ListItem>Cats</ListItem>
                        <ListItem>Dogs</ListItem>
                        <ListItem>Mathematics and computer science</ListItem>
                    </List>
                </Drawer>

                {this.props.children}
            </div>
        );
    }
}

Layout.propTypes = {
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(Layout);

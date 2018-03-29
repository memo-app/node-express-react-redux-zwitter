// Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames'

// UI Imports
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';

// App Imports
import SearchBox from './search/SearchBox';
import UserButtonLogin from './account/button/login';
import UserButtonLogged from './account/button/logged';
import Loading from './loading';
import { fetchCategories } from './../actions/category';

import './style.css';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: this.openDrawerLayout()
        };
    }

    componentDidUpdate(nextProps) {
        if (nextProps.user.isAuthenticated && !this.props.categories) {
            nextProps.fetchCategories();
        }
    }

    updateLayout() {
        if (window.innerWidth >= 1024 && !this.state.drawerOpen) {
            this.setState({ drawerOpen: true });
        } else if (window.innerWidth < 1024 && this.state.drawerOpen) {
            this.setState({ drawerOpen: false });
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateLayout.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateLayout.bind(this));
    }

    openDrawerLayout = () => window.innerWidth >= 1024;

    handleDrawerToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });

    handleDrawerToggleIfNeeded = () => !this.openDrawerLayout() && this.handleDrawerToggle();

    render() {
        const { isAuthenticated } = this.props.user;
        const categories = this.props.categories;

        return (
            <div>
                <AppBar
                    className="app-bar"
                    title={<div>
                        <span style={{ marginRight: '20px' }}>MemoApp</span>
                        <SearchBox searchTerm={this.state.searchTerm} />
                    </div>}
                    showMenuIconButton={isAuthenticated}
                    onLeftIconButtonClick={this.handleDrawerToggle}
                    iconElementRight={isAuthenticated ? <UserButtonLogged /> : <UserButtonLogin />}
                />

                {isAuthenticated &&
                    <Drawer
                        docked={true}
                        open={this.state.drawerOpen}
                        onRequestChange={(open) => this.setState({ open })}
                        containerStyle={{ 'top': '65px' }}
                    >
                        <MenuItem onTouchTap={this.handleDrawerToggleIfNeeded} containerElement={<Link to="/" />}>
                            <span role="img" aria-label="">🏠</span> Home
                        </MenuItem>
                        <MenuItem onTouchTap={this.handleDrawerToggleIfNeeded} containerElement={<Link to="/search" />}>
                            <span role="img" aria-label="">🔍</span> Search
                        </MenuItem>
                        <MenuItem onTouchTap={this.handleDrawerToggleIfNeeded} containerElement={<Link to="/about" />}>
                            <span role="img" aria-label="">ℹ️</span> About
                        </MenuItem>

                        <List>
                            <Subheader>Categories</Subheader>
                            {categories ?
                                categories.map(c =>
                                    <Link key={c} to={`/memos/category/${c}`} onTouchTap={this.handleDrawerToggleIfNeeded}>
                                        <ListItem>{c}</ListItem>
                                    </Link>) :
                                <Subheader><Loading /></Subheader>
                            }
                        </List>
                    </Drawer>}
                <div
                    className={classnames('app-content', { 'expanded': isAuthenticated && this.state.drawerOpen })}
                >
                    {this.props.children}
                </div>
            </div >
        );
    }
}

Layout.propTypes = {
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
        categories: state.categories.categories
    }
}

export default connect(mapStateToProps, { fetchCategories })(Layout);

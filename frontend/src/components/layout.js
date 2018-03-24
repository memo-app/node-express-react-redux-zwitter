// Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
import Loading from './loading';
import { fetchCategories } from './../actions/category';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    componentDidUpdate(nextProps) {
        if (nextProps.user.isAuthenticated && !this.props.categories) {
            nextProps.fetchCategories();
        }
    }

    handleDrawerToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });

    render() {
        const { isAuthenticated } = this.props.user;
        const categories = this.props.categories;

        return (
            <div>
                <AppBar
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
                        docked={false}
                        open={this.state.drawerOpen}
                        onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
                    >
                        <MenuItem onTouchTap={this.handleDrawerToggle} containerElement={<Link to="/" />}>
                            <span role="img" aria-label="">🏠</span> Home
                        </MenuItem>
                        <MenuItem onTouchTap={this.handleDrawerToggle} containerElement={<Link to="/search" />}>
                            <span role="img" aria-label="">🔍</span> Search
                        </MenuItem>
                        <MenuItem onTouchTap={this.handleDrawerToggle} containerElement={<Link to="/about" />}>
                            <span role="img" aria-label="">ℹ️</span> About
                        </MenuItem>

                        <List>
                            <Subheader>Categories</Subheader>
                            {categories ?
                                categories.map(c =>
                                    <Link key={c} to={`/memos/category/${c}`} onTouchTap={this.handleDrawerToggle}>
                                        <ListItem>{c}</ListItem>
                                    </Link>) :
                                <Subheader><Loading /></Subheader>
                            }
                        </List>
                    </Drawer>
                }

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
        user: state.user,
        categories: state.categories.categories
    }
}

export default connect(mapStateToProps, { fetchCategories })(Layout);

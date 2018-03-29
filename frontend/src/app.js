// Imports
import React from 'react';
import { Route, Switch } from 'react-router-dom'

// App Imports
import Layout from './components/layout';
import AuthRedirect from './components/account/auth-redirect';
import SearchContainer from './components/search/SearchContainer'
import MemoListContainer from './components/memo/list-container';
import MemoAdd from './components/memo/add';
import MemoViewContainer from './components/memo/view-container';
import MemoListByCategoryContainer from './components/memo/category-container';
import Account from './components/account';
import UserLogin from './components/account/login';
import UserRegister from './components/account/register';
import About from './components/about';
import PageNotFound from './components/page-not-found';


const App = () => (
    <Layout>
        <AuthRedirect />
        <Switch>
            <Route exact path="/" component={MemoListContainer} />
            <Route path="/search" component={SearchContainer} />
            <Route path="/memo/add" component={MemoAdd} />
            <Route path="/memo/:memoId" component={MemoViewContainer} />
            <Route path="/memos/category/:category" component={MemoListByCategoryContainer} />
            <Route path="/account/login" component={UserLogin} />
            <Route path="/account/register" component={UserRegister} />
            <Route path="/account" component={Account} />
            <Route path="/about" component={About} />
            <Route component={PageNotFound} />
        </Switch>
    </Layout>
);

export default App;

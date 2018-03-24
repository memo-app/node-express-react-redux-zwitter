// Imports
import React from 'react';
import { Route, Switch } from 'react-router-dom'

// App Imports
import Layout from './components/layout'
import SearchContainer from './components/search/SearchContainer'
import MemoListContainer from './components/memo/list-container';
import MemoAdd from './components/memo/add';
import MemoViewContainer from './components/memo/view-container';
import MemoListByCategoryContainer from './components/memo/category-container';
import UserLogin from './components/user/login';
import UserRegister from './components/user/register';
import About from './components/about';
import PageNotFound from './components/page-not-found';

const App  = () => (
    <Layout>
        <Switch>
            <Route exact path="/" component={ MemoListContainer } />
            <Route path="/search" component={ SearchContainer} />
            <Route path="/memo/add" component={ MemoAdd } />
            <Route path="/memo/:memoId" component={ MemoViewContainer } />
            <Route path="/memos/category/:category" component={ MemoListByCategoryContainer} />
            <Route path="/user/login" component={ UserLogin } />          
            <Route path="/user/register" component={ UserRegister } />
            <Route path="/about" component={ About } />
            <Route component={ PageNotFound }/>
        </Switch>
    </Layout>
);

export default App;

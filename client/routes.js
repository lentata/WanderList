import React from 'react';
import { render } from 'react-dom';

import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import ListsIndex from './containers/lists';
import NewList from './containers/new_list';
import ListDetail from './containers/list-detail';
import Login from './containers/login';
import Signup from './containers/signup';
// import Votes from './components/VoteCounter';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ ListsIndex } />
    <Route path="lists/new" component={ NewList } />
    <Route path="/lists/:id" component={ ListDetail } />
    <Route path='login' component={ Login } />
    <Route path='signup' component={ Signup } />
  </Route>
);

// <Route path='/' component= { Votes } />

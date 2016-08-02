import React from 'react';
import { render } from 'react-dom';


import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import ListsIndex from './containers/lists';
import ListDetail from './containers/list-detail';
import Login from './containers/login';

//need to import new list when that's created

export default (
  <Route path='/' component={App}>
    <IndexRoute component={ ListsIndex } />
    <Route path="/lists/:id" component={ ListDetail }></Route>
// import ListDetail from './containers/list-detail';
    <Route path='login' component={Login} />
  </Route>
);


    // <Route path="lists/:id" component = {ShowList} />

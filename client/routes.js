import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import ListsIndex from './containers/lists';
import ListDetail from './containers/list-detail';
//need to import new list when that's created

export default (
  <Route path='/' component={App}>
    <IndexRoute component={ ListsIndex } />
    <Route path="/lists/:id" component={ ListDetail }></Route>
  </Route>
  );

    // <Route path="lists/:id" component = {ShowList} />

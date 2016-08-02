import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import ListsIndex from './containers/lists';
import ListDetail from './containers/list-detail';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={ListsIndex}>
      <Route path="/view/:listId" component={ ListDetail }></Route>
    </IndexRoute>
  </Route>
  );

    // <Route path="lists/:id" component = {ShowList} />

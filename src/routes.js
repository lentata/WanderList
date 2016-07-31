import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import ListsIndex from './containers/lists';
import ShowList from './components/show_list';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={ListsIndex} />
  </Route>
  );

    // <Route path="lists/:id" component = {ShowList} />

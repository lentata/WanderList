import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import ListsIndex from './containers/lists';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={ListsIndex} />
  </Route>

  );
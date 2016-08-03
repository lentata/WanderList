import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import {Router, browserHistory, withRouter} from 'react-router';
import routes from './routes';
import reducers from './reducers';
import promise from 'redux-promise'

// import comments from './data/comments';
// import lists from './data/lists';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

//for redux dev tools
const enhancers = compose(window.devToolsExtension ? window.devToolsExtension() : f => f);

//tried to put defaultState (our data) and enhancers here
const store = createStoreWithMiddleware(reducers, enhancers);

//browserHistory keeps track of app's pages you've been on
const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

//Render our app!
ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider> , document.querySelector('.container'));

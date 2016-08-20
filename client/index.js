import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import {Router, browserHistory, withRouter} from 'react-router';
import routes from './routes';
import reducers from './reducers';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

const store = createStore(reducers, {},
  compose(applyMiddleware(function promiseMiddleware({ dispatch }) {
    return next => action => {
      return isPromise(action.payload)
        ? action.payload.then(
            result => dispatch({ ...action, payload: result }),
            error => {
              dispatch({ ...action, payload: error, error: true });
              return Promise.reject(error);
            }
          )
        : next(action);
    };
  }), window.devToolsExtension ? window.devToolsExtension() : f => f));

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
  </Provider> , document.querySelector('.mainPage'));

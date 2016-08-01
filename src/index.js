import React from 'react';
import ReactDOM from 'react-dom';
//import Router from './routes';
import { createStore, applyMiddleware } from 'redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import reducers from './reducers';
import promise from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ browserHistory} routes={routes} />
  </Provider> , document.querySelector('.container'));


//Hard Reload if statement
// if (module.hot) {
//   module.hot.accept();
// }

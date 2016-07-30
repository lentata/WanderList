import React from 'react';
import ReactDOM from 'react-dom';
//import Router from './routes';
import { createStore } from 'redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import reducers from './reducers';


ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Router history={ browserHistory} routes={routes} />
  </Provider> , document.querySelector('.container'));


//Hard Reload if statement
if (module.hot) {
  module.hot.accept();
}

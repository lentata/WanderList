import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';

class App extends Component {
  render() {
    return (
      <div>TEST TEXT GOES HERE
        <h1>Test hot reload in index.js</h1>
        <Router />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));

if (module.hot) {
  module.hot.accept();
}

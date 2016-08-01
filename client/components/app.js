import React from 'react';
import { Component } from 'react';
import Lists from '../containers/lists';
import ListDetail from '../containers/list-detail';

export default class App extends Component {
  render() {
    return (
      <div>
         <Lists />
         <ListDetail />
      </div>
    );
  }
}

//          {this.props.children}
//        <Lists />
//        <ListDetail />

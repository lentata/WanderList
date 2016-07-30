import React from 'react';
import { Component } from 'react';
import ListDetail from '../components/show_list';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.children}
        </div>
        <div>
          <ListDetail />
        </div>
      </div>
    );
  }
}
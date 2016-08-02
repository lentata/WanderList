import React from 'react';
import { Component } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import { bindActionCreators } from 'redux';
import Lists from '../containers/lists';

// import Lists from '../containers/lists';
import ListDetail from '../containers/list-detail';

export default class App extends Component {
  render() {
    return (
      <div>
        { React.cloneElement(this.props.children, this.props) }
      </div>
    );
  }
}

// function mapStateToProps(state){
//   return {
//     lists: state.lists
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actionCreators, dispatch);
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Lists);




//          {this.props.children}
//        <Lists />
//        <ListDetail />

// { React.cloneElement(this.props.children, this.props) }
//

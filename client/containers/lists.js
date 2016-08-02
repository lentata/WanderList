import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectList } from '../actions/index';
import { bindActionCreators } from 'redux';

class Lists extends Component {
  renderList(){
    return this.props.lists.map((list) =>{
      return (
        <li
          key={list.title}
          onClick={() => this.props.selectList(list)}>
          {list.title}
        </li>
      );
    });
  }

  render() {
    return (
      <ul>
        <li>LISTS BELOWWWWW!</li>
        {this.renderList()}
      </ul>
    );
  }

}


function mapStateToProps(state){
  return {
    lists: state.lists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);

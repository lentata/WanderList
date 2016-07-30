import React, { Component } from 'react';
import { connect } from 'react-redux';
//actions 
//import { bindActionCreators } from 'redux';



class tenList extends Component {
  renderList(){
    return this.props.lists.map((list) =>{
      return (
        <li
          key={list.title}>
          {list.title}
        </li>
      );
    });
  }



  render() {
    return (
      <ul>
        <li>HottoDoggu!</li>
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

export default connect(mapStateToProps)(tenList);
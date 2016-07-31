import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListDetail extends Component {
  render() {
    if(!this.props.list) {
      return <div>Select a list!</div>;
    }

    return (
      <div>
        <h2>Lists:</h2>
        <div>Headline: {this.props.list.title}</div>
        <div>Author: {this.props.list.author}</div>
        <div>Votes: {this.props.list.votes}</div>
        <div>First: {this.props.list[1]}</div>
        <div>Second: {this.props.list[2]}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.activeList
  };
}

export default connect(mapStateToProps)(ListDetail);

//        <div>First: {this.props.list[1]}</div>
//        <div>Second: {this.props.list[2]}</div>

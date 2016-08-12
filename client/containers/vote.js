import React, { Component } from 'react';

export default class Votes extends Component {

  constructor(props) {
    super(props);

    // Bind upvoting functions
    this.upvoteFunc = this.upvoteFunc.bind(this);
    this.downvoteFunc = this.downvoteFunc.bind(this);
  }

  upvoteFunc() {
    this.props.upvoteAction(this.props.list._id);
  }

  downvoteFunc() {
    this.props.downvoteAction(this.props.list._id);
  }

  render() {
    // const { upStyle, downStyle, numStyle } = this.state;
    const { list } = this.props;
    return (
      <div className="col-md-1">
        <div className="text-center">
          <i className="button text-center fa fa-chevron-up" style={{color: list.upflag ? "blue" : "grey"}} onClick={this.upvoteFunc}></i>
        </div>
        <div className="text-center" style={{color: list.downflag ? "red" : list.upflag ? "blue" : "grey"}}>{list.upvote - list.downvote}</div>
        <div className="text-center">
          <i className="button text-center fa fa-chevron-down" style={{color: list.downflag ? "red" : "grey"}} onClick={this.downvoteFunc}></i>
        </div>
      </div>
    );
  }
}

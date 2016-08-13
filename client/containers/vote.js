import React, { Component } from 'react';

export default class Votes extends Component {

  constructor(props) {
    super(props);

    // Bind upvoting functions
    this.upvoteFunc = this.upvoteFunc.bind(this);
    this.downvoteFunc = this.downvoteFunc.bind(this);
  }

  upvoteFunc() {
    if(firebase.auth().currentUser) {
      this.props.upvoteAction(this.props.list._id, "57acacb4b086aca01bc783ea");
    } else {
      alert("You must be signed in to upvote lists!");
    }
  }

  downvoteFunc() {
    if(firebase.auth().currentUser) {
      this.props.downvoteAction(this.props.list._id.toString(), "57acacb4b086aca01bc783ea");
    } else {
      alert("You must be signed in to downvote lists!");
    }
  }

  render() {
    const { list, info } = this.props;
    const upflag = this.props.upLists.includes(list._id.toString());
    const downflag = this.props.downLists.includes(list._id.toString());
    return (
      <div className="col-md-1">
        <div className="text-center">
          <i className="button text-center fa fa-chevron-up" style={{color: upflag ? "blue" : "grey"}} onClick={this.upvoteFunc}></i>
        </div>
        <div className="text-center" style={{color: downflag ? "red" : upflag ? "blue" : "grey"}}>{list.upvote - list.downvote}</div>
        <div className="text-center">
          <i className="button text-center fa fa-chevron-down" style={{color: downflag ? "red" : "grey"}} onClick={this.downvoteFunc}></i>
        </div>
      </div>
    );
  }
}

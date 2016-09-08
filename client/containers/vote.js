import React, { Component } from 'react';

export default class Votes extends Component {
  constructor(props) {
    super(props);

    this.upvoteFunc = this.upvoteFunc.bind(this);
    this.downvoteFunc = this.downvoteFunc.bind(this);
  }

  upvoteFunc() {
    if (firebase.auth().currentUser) {
      this.props.upvoteAction(this.props.list._id, firebase.auth().currentUser.uid);
    } else {
      alert("You must be signed in to upvote lists!");
    }
  }

  downvoteFunc() {
    if (firebase.auth().currentUser) {
      this.props.downvoteAction(this.props.list._id.toString(), firebase.auth().currentUser.uid);
    } else {
      alert("You must be signed in to downvote lists!");
    }
  }

  render() {
    const { list, info } = this.props;
    const upflag = this.props.upLists.includes(list._id.toString());
    const downflag = this.props.downLists.includes(list._id.toString());
    const votes = this.props.votes;
    return (
      <div className="list_overview_votes">
        <div className="button text-center fa fa-chevron-up fa-2x list_overview_votes_inner" style={{ color: upflag ? "blue" : "grey" }} onClick={ this.upvoteFunc }></div>
        <div className="text-center list_overview_votes_count list_overview_votes_inner" style={{ color: downflag ? "red" : upflag ? "blue" : "grey" }}>{ votes }</div>
        <div className="button text-center fa fa-chevron-down fa-2x list_overview_votes_inner" style={{ color: downflag ? "red" : "grey" }} onClick={ this.downvoteFunc }></div>
      </div>
    );
  }
}

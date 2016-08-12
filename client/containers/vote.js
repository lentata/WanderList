import React, { Component } from 'react';

export default class Votes extends Component {

  constructor(props) {
    super(props);

    // Bind upvoting functions
    this.upvoteFunc = this.upvoteFunc.bind(this);
    this.downvoteFunc = this.downvoteFunc.bind(this);

    this.state = {
      upflag: false,
      downflag: false,
      num: 18
    };
  }

  upvoteFunc() {
    this.state.downflag ? this.setState({num: this.state.num + 2}) : this.state.upflag ? this.setState({num: this.state.num - 1}) : this.setState({num: this.state.num + 1});
    this.state.upflag ? this.setState({upflag: false, downflag: false}) : this.setState({upflag: true, downflag: false});
    this.props.upvoteAction(this.props.list._id.toString(), "57acacb4b086aca01bc783ea");
  }

  downvoteFunc() {
    this.state.upflag ? this.setState({num: this.state.num - 2}) : this.state.downflag ? this.setState({num: this.state.num + 1}) : this.setState({num: this.state.num - 1});
    this.state.downflag ? this.setState({upflag: false, downflag: false}) : this.setState({upflag: false, downflag: true});
    this.props.downvoteAction(this.props.list._id.toString(), "57acacb4b086aca01bc783ea");
  }

  render() {
    const { list } = this.props; 
    return (
      <div className="col-md-1">
        <div className="text-center">
          <i className="button text-center fa fa-chevron-up" style={{color: this.state.upflag ? "blue" : "grey"}} onClick={this.upvoteFunc}></i>
        </div>
        <div className="text-center" style={{color: this.state.downflag ? "red" : this.state.upflag ? "blue" : "grey"}}>{this.state.num}</div>
        <div className="text-center">
          <i className="button text-center fa fa-chevron-down" style={{color: this.state.downflag ? "red" : "grey"}} onClick={this.downvoteFunc}></i>
        </div>
      </div>
    );
  }
}

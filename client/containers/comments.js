import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addComment, removeComment } from '../actions/index';
import { bindActionCreators } from 'redux';
import Linkify from 'react-linkify';
import moment from 'moment';

export class Comments extends Component {
  constructor(props){
    super(props);
  }

  renderComment(comment, i) {
    let deleter = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

    return (
      <div className="comment" key={i}>
        <h5>
          <strong>
            <Link to={'/userProfile/' + comment.userId}>
            {comment.user}
            </Link>
          </strong>
          <small><em>  {moment(comment.posted).fromNow()} &nbsp;</em></small>

          {deleter === comment.userId ? <button className="remove-comment" onClick={ this.props.removeComment.bind(this, this.props.list._id, i)}>&times;</button> : <div/>}
        </h5>
        <h5><Linkify>{comment.text}</Linkify></h5>
      </div>
    )
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const author = firebase.auth().currentUser ? firebase.auth().currentUser.displayName : null;
    const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

    if(author && userId) {
      const postId = this.props.list._id;
      const comment = this.refs.comment.value;
      this.props.addComment(postId, userId, author, comment);
      this.refs.commentForm.reset();
    } else {
      alert("You must log in to post a comment!")
    }
  }

  render() {

    return (
      <div className="comments">
        <legend className="list-legend">Comments</legend>
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="comment" placeholder=" Leave a comment!" />
          <input type="submit" hidden />
        </form>
        {this.props.list.comments
          .sort( (a, b) => {
          // console.log("a:", a, "b:", b);
          return Date.parse(b.posted) - Date.parse(a.posted);
        })
          .map(this.renderComment, this)}
      </div>
    )
  }
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addComment, removeComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(Comments);

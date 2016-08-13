import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addComment, removeComment } from '../actions/index';
import { bindActionCreators } from 'redux';

export class Comments extends Component {
  constructor(props){
    super(props);

   // this.props.deleteComment = this.props.deleteComment.bind(this);

  }

  renderComment(comment, i) {
    console.log("COMMENT PROPS", this.props)

    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          <button className="remove-comment" onClick={this.props.removeComment.bind(this, this.props.list._id, i)}>&times;</button>
        </p>
      </div>
    )
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const author = firebase.auth().currentUser ? firebase.auth().currentUser.displayName : null;

    if(author) {
      const postId = this.props.list._id;
      const comment = this.refs.comment.value;
      this.props.addComment(postId, author, comment);
      this.refs.commentForm.reset();
    } else {
      alert("You must log in to post a comment!")
    }
  }
  //ref attributes on form allow us to use them in handle submit function
  render() {
    console.log(this.props);

    return (
      <div className="comments">
        <legend className="list-legend">Comments</legend>
        {this.props.list.comments.map(this.renderComment, this)}
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="comment" placeholder="comment" />
          <input type="submit" hidden />
        </form>
      </div>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addComment, removeComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(Comments);

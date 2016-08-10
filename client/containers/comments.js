import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addComment, removeComment } from '../actions/index';
import { bindActionCreators } from 'redux';

export class Comments extends Component {
  renderComment(comment, i) {
    // console.log("comment:", comment);
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          {/*<button className="remove-comment" onClick={this.props.removeComment.bind(null, this.props.list.id, i)}>&times;</button>*/}
        </p>
      </div>
    )
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const postId = this.props.list.id;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
    console.log("ADD COMMENT PROP", this.props.addComment);
    this.props.addComment(postId, author, comment);
    this.refs.commentForm.reset();
  }
  //ref attributes on form allow us to use them in handle submit function
  render() {
    console.log("COMMENTS", this.props.comments, this.props.addComment);
    return (
      <div className="comments">
        <legend className="list-legend">Comments</legend>
        {this.props.list.comments.map(this.renderComment)}
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="author" placeholder="author" />
          <input type="text" ref="comment" placeholder="comment" />
          <input type="submit" hidden />
        </form>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addComment, removeComment }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

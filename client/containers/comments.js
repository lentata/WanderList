import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addComment, removeComment } from '../actions/index';
import { bindActionCreators } from 'redux';

class Comments extends Component {
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
    const { postId } = this.props.params;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
    //test logs
    console.log(postId, author, comment);
    console.log(this.refs);
    //use addComment action creator here
    this.props.addComment(postId, author, comment);
    //reset comment form after submitting comment
    this.refs.commentForm.reset();
  }
  //ref attributes on form allow us to use them in handle submit function above
  render() {
      console.log("ARE PROPS EVEN HERE?!?!", this.props);
      console.log("ARE COMMENTS EVEN HERE?!?!", this.props.comments);
      // console.log("ARE POST COMMENTS EVEN HERE?!?!", this.props.postComments);

    return (
      <div className="comments">
        {/*{this.props.postComments.map(this.renderComment)}*/}
        {this.props.list.comments.map(this.renderComment)}
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
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

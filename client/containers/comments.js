import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addComment, removeComment } from '../actions/index';
import { bindActionCreators } from 'redux';

export class Comments extends Component {
  constructor(props){
    super(props);
    this.props.deleteComment = this.props.deleteComment.bind(this);
  }
  renderComment(comment, i) {
    // console.log("comment:", comment);
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}

          {<button className="remove-comment" onClick={this.props.deleteComment}>&times;</button>}

          {/*<button className="remove-comment" onClick={this.props.removeComment.bind(null, this.props.list.id, i)}>&times;</button>*/}

        </p>
      </div>
    )
  }
  deleteComment(){
    this.props.removeComment(postId);

  }

  handleSubmit(evt) {
    evt.preventDefault();

    const postId = this.props.list._id;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;

    this.props.addComment(postId, author, comment);
    this.refs.commentForm.reset();
  }
  //ref attributes on form allow us to use them in handle submit function
  render() {
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addComment, removeComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(Comments);

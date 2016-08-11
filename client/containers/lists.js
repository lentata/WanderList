import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Votes from './vote';


export class Lists extends Component {
  renderLists() {

    const { list, i, upvote, downvote } = this.props;
    return (
      <div className="media" key={ list.id }>
        <div className="row">
          
          <Votes 
            list={list}
            upvoteAction={upvote}
            downvoteAction={downvote} />

          <div className="col-md-1">
            <img className="img-thumbnail" src={list.content[0].img} />
          </div>

          <div className="media-body">
            <Link to={ "lists/" + list._id } className="media-heading">
              { list.title }
            </Link>
            <div className="small"><em>{ list.author } &nbsp;</em>
            <span className="fa fa-commenting"> Comments: {list.comments.length} </span>
            </div>
            <div className="small fa fa-caret-square-o-right"><em>Categories: { list.categories }</em></div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <li className="list-group-item">
          { this.renderLists() }
        </li>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upvote, downvote }, dispatch);
}

export default connect(null, mapDispatchToProps)(Lists);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Votes from './vote';
import ListComponent from '../components/listcomponent';

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

          <ListComponent 
            list={list} />
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

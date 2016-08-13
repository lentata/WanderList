import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote, fetchUserInfo } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Votes from './vote';
import ListComponent from '../components/listcomponent';

export class Lists extends Component {

  renderLists() {
    const { list, i, upvote, downvote, info, upLists, downLists } = this.props;
    return (
      <div className="media" key={ list._id }>
        <div className="row">
          <Votes
            list={list}
            info={info}
            upvoteAction={upvote}
            downvoteAction={downvote}
            upLists={upLists}
            downLists={downLists} />
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

function mapStateToProps(state) {
  return {
    userInfo: state.lists.info,

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upvote, downvote, fetchUserInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);

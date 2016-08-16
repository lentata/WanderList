import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote, favorite, fetchUserInfo } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Votes from './vote';
import ListComponent from '../components/listcomponent';
import Favorite from './favorite';

export class Lists extends Component {

  renderLists() {
    const { list, upvote, downvote, favorite, info, upLists, downLists, favoriteLists, votes } = this.props;
    return (
      <div className="media" key={ list._id }>
        <div className="row">
          <Votes
            list={list}
            info={info}
            upvoteAction={upvote}
            downvoteAction={downvote}
            votes={votes}
            upLists={upLists}
            downLists={downLists} />
          <ListComponent
            list={list} />
          <Favorite
            list={list}
            favoriteAction={favorite}
            favoriteLists={favoriteLists} />
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
  return bindActionCreators({ upvote, downvote, favorite }, dispatch);
}

export default connect(null, mapDispatchToProps)(Lists);

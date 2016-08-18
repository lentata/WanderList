import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote, favorite, fetchList, deleteList } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import Comments from './comments';
import Votes from './vote';
import Favorites from './favorite';
import NavBar from '../components/nav';
import Linkify from 'react-linkify';
import moment from 'moment';


export class ListDetail extends Component {
  componentWillMount() {
    this.props.fetchList(this.props.params.id);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  renderList() {
    return this.props.list.content.map((item, i) => {
      return (
        <div key={i}>
          <li>
            <h2>{item.headline}</h2>
            <img src={item.image} alt={item.headline} />
            <p className="h6">
              <Linkify>{item.description}</Linkify>
            </p>
          </li>
        </div>
      );
    });
  }

  onDeleteClick() {
    const deleter = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

    if(deleter === this.props.list.authorId) {
      this.props.deleteList(this.props.list._id);
      browserHistory.push('/');
    } else {
      alert("Can only delete your own lists!");
    }

    // this.props.deleteList(this.props.list._id);
    // this.props.deleteList(this.props.params.id)
  }

  render() {
    const { list, upvote, downvote, info, upLists, downLists, favorite, favLists } = this.props;
    const deleter = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
    const author = this.props.list ? this.props.list.authorId : null;

    if(!list) {
      return <div><img height="100%" src="../loading.gif" alt="loading" /></div>;
    }
    return (
      <div>
        <NavBar
          list={list}
          />
             <div className="btn-toolbar">
              {deleter === author ? <button
                className="btn btn-danger navbar-btn navbar-right col-md-1"
                onClick={ this.onDeleteClick }>
                Delete List
              </button> : <div/>}
            </div>

      {/* TODO: Refactor this to be the <VOTE /> component  */}
        <div className="container-fluid pull-left">
          <Votes
            list={list}
            info={info}
            upvoteAction={upvote}
            downvoteAction={downvote}
            votes={list.upvote - list.downvote}
            upLists={upLists}
            downLists={downLists} />
          <Favorites
            list={list}
            favoriteAction={favorite}
            favoriteLists={favLists} />
        </div>

        <div className="container-fluid">
          <div className="h1">{ list.title }</div>
          <span className="fa fa-user"/>
          <span> {list.author ? list.author :  "¯\\_(ツ)_/¯"} &nbsp;</span>
          <span className="fa fa-clock-o"/>
          <span>  {moment(list.createdAt).fromNow()} &nbsp;</span>
          <br/>
          <span className="fa fa-tags"/>
          <span><em> {list.categories}</em></span>
        </div>
        <ol className="h2">
          {this.renderList()}
        </ol>
        <Comments list={this.props.list}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('STATE: ', state);
  return {
    list: state.lists.list,
    info: state.lists.info,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists,
    favLists: state.lists.favoriteLists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upvote, downvote, favorite, fetchList, deleteList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);

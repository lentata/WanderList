import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote, favorite, fetchList, deleteList, fetchUserInfo } from '../actions/index';
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
    if (localStorage.getItem('logged')) {
      this.props.fetchUserInfo(JSON.parse(localStorage.getItem('userId')).userId);
    }
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  renderList() {
    return this.props.list.content.map((item, i) => {
      return (
        <div key={ i }>
          <li className="detail-lists">
            <div>{ item.headline }</div>
            <img className="detail-img" src={ item.image } alt={ item.headline } />
            <p className="detail-lists-caption">
              <Linkify>{ item.description }</Linkify>
            </p>
          </li>
        </div>
      );
    });
  }

  onDeleteClick() {
    const deleter = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
    if (deleter === this.props.list.authorId) {
      this.props.deleteList(this.props.list._id);
      browserHistory.push('/');
    } else {
      alert("Can only delete your own lists!");
    }
  }

  render() {
    const { list, upvote, downvote, info, upLists, downLists, favorite, favLists } = this.props;
    const deleter = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
    const author = this.props.list ? this.props.list.authorId : null;

    if (!list) {
      return <div><img height="100%" src="../loading.gif" alt="loading" /></div>;
    }

    return (
      <div className='container'>
        <NavBar list={list} />

        <div className="row">
          <div className="col-xs-8 list-detail-container">
            <div>
              <div className="btn-toolbar">
                { deleter === author ?
                  <button className="btn btn-danger col-md-2"
                    onClick={ this.onDeleteClick }>
                    Delete List</button> : <div/> }
              </div>
              <Votes
                list={ list }
                info={ info }
                upvoteAction={ upvote }
                downvoteAction={ downvote }
                votes={ list.upvote - list.downvote }
                upLists={ upLists }
                downLists={ downLists } />
            </div>

            <div>
              <span>
                <Favorites
                  list={ list }
                  favoriteAction={ favorite }
                  favoriteLists={ favLists } />
              </span>
              <div className="list_detail_title">{ list.title }</div>

              <div className="list_detail_overview_inner_container">
                <span className="fa fa-user list_detail_overview_inner" />
                <span className="list_overview_words">
                  &nbsp;<Link to={ '/userProfile/' + this.props.list.authorId }>{ list.author ? list.author : "¯\\_(ツ)_/¯" }</Link>
                </span>

                <span className="fa fa-clock-o list_detail_overview_inner" />
                <span className="list_overview_words">
                  &nbsp;created { moment(list.createdAt).fromNow() }
                </span>

                <span className="fa fa-commenting list_detail_overview_inner" />
                <span className="list_overview_words">
                  &nbsp;{ list.comments.length > 1 ? list.comments.length + " comments" : list.comments.length === 1 ? "1 comment" : "no comments" }
                </span>
              </div>

              <div>
                <span>
                  { list.categories.map((category, i) => {
                    return (
                    <div className="list_detail_overview_cats">
                      <Link key={ i } to={ "/categoryPage/" + category }>
                        <span className="label label-default">
                          { category }
                        </span>
                      </Link>
                    </div>);
                  })}
                </span>
              </div>
            </div>
            <ol className="overview-list-item-separation">
              { this.renderList() }
            </ol>
          </div>
          <div className="col-xs-4 list-detail-container">
            <Comments list={ this.props.list }/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.lists.all[0],
    info: state.lists.info,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists,
    favLists: state.lists.favoriteLists,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upvote, downvote, favorite, fetchUserInfo, fetchList, deleteList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);

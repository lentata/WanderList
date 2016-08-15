import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote, fetchList, deleteList } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import Comments from './comments';
import Votes from './vote';
import NavBar from '../components/nav';
import Linkify from 'react-linkify';
import moment from 'moment';

export class ListDetail extends Component {

  componentWillMount() {
    console.log("THISISIT", this.props.params.id);
    this.props.fetchList(this.props.params.id);
    this.onDeleteClick = this.onDeleteClick.bind(this)
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
    this.props.deleteList(this.props.list._id);
    // this.props.deleteList(this.props.params.id)
    browserHistory.push('/');
  }

  render() {
    const { upvote, downvote, list, info, upLists, downLists } = this.props;
    console.log("list-detial, ", this.props);

    if(!list) {
      return <div><img height="100%" src="../loading_gangnam.gif" alt="loading" /></div>;
    }
    return (
      <div>
        <NavBar
          list={list}
          />
             <div className="btn-toolbar">
              <Link to="/" className="btn btn-default navbar-btn navbar-right col-md-1">
                Back to Main
              </Link>

              <button
                className="btn btn-danger navbar-btn navbar-right col-md-1"
                onClick={ this.onDeleteClick }>
                Delete List
              </button>
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
        </div>

        <div className="container-fluid">
          <div className="h1">{ list.title }</div>
          <span className="fa fa-user"/>
          <span> by {list.author ? list.author :  "¯\\_(ツ)_/¯"} &nbsp;</span>
          <span className="fa fa-clock-o"/>
          <span> posted {moment(list.createdAt).fromNow()} &nbsp;</span>
          <h6>Categories: { list.categories }</h6>
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
  return {
    list: state.lists.list,
    info: state.lists.info,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upvote, downvote, fetchList, deleteList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);

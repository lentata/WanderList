import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchList, deleteList } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import Comments from './comments';

class ListDetail extends Component {

  componentWillMount() {
    this.props.fetchList(this.props.params.id);
  }

  renderList() {
    return this.props.list.content.map((x, i) => {
      return (
        <div key={i}>
          <li>
            <h2>{x.headline}</h2>
            <img src={x.img} alt={x.headline} />
            <p className="h6">{x.desc}</p>
          </li>
        </div>
      );
    });
  }

  onDeleteClick() {
    this.props.deleteList(this.props.params.id)
      .then(() => {
        browserHistory.push('/');
      });
  }

  render() {
    const list = this.props.list;

    if(!list) {
      return <div><img height="100%" src="../loading_gangnam.gif" alt="loading" /></div>;
    }

    return (
      <div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/"  className="navbar-brand">
                <img height="100%" src="../logo.png" alt="WanderList-logo" />
              </Link>
            </div>

            <div className="btn-toolbar">
              <Link to="/" className="btn btn-default navbar-btn navbar-right col-md-1">
                Back to Main
              </Link>

              <button
                className="btn btn-danger navbar-btn navbar-right col-md-1"
                onClick={ this.onDeleteClick.bind(this) }>
                Delete List
              </button>
            </div>
          </div>
        </nav>

        <div className="container-fluid pull-left">
          <div className="button fa fa-chevron-up"></div>
          <div>{ list.upvote - list.downvote }</div>
          <div className="button fa fa-chevron-down"></div>
        </div>

        <div className="container-fluid">
          <div className="h1">{ list.title }</div>
          <h5>{ list.author } </h5>
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
    list: state.lists.list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchList, deleteList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);

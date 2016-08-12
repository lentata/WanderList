import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchList, deleteList } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import Comments from './comments';
import NavBar from '../components/nav';

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
            <p className="h6">{item.desc}</p>
          </li>
        </div>
      );
    });
  }

  onDeleteClick() {
    console.log("ERRRR, delete", this.props);
    this.props.deleteList(this.props.list._id);
    // this.props.deleteList(this.props.params.id)  
    browserHistory.push('/');
  }

  render() {
    const { list } = this.props;
    console.log("PROPS HERE", this.props);

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
    {/*
              <button
                className="btn btn-danger navbar-btn navbar-right col-md-1"
                onClick={ this.onDeleteClick.bind(this) }>
                Delete List
              </button>
      */}


      {/* TODO: Refactor this to be the <VOTE /> component  */}
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists } from '../actions/index';
import { bindActionCreators } from 'redux';
import List from './lists';
import { Link } from 'react-router';

export class ListGrid extends Component {
  componentWillMount() {
    this.props.fetchLists();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">
                <img height="100%" src="./logo.png" alt="WanderList-logo" />
              </a>
            </div>
            <Link to='/signup' className="btn btn-default navbar-btn navbar-right col-md-1">
              Sign Up
            </Link>
            <Link to='/login' className="btn btn-default navbar-btn navbar-right col-md-1">
              Log In
            </Link>
            <Link to="/lists/new" className="btn btn-primary navbar-btn navbar-right col-md-1">
              Add a list
            </Link>
          </div>
        </nav>
        <ul className="list-group">
          {this.props.lists.map((list, i) => <List {...this.props} key={i} i={i} list={list} />)}
        </ul>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    lists: state.lists.all
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGrid);

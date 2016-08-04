import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists } from '../actions/index';
import { bindActionCreators } from 'redux';
import List from './lists';
import { Link } from 'react-router';

class ListGrid extends Component {
  componentWillMount() {
    this.props.fetchLists();
  }

  render() {
    console.log('this.props: ', this.props);
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
          </div>
          <div className="col-md-2">
            <Link to="/lists/new" className="btn btn-primary">
              Add a list
            </Link>
          </div>
          <div className="col-md-2">
            <Link to='/login'>
              Log In
            </Link>
          </div>
          <div className="col-md-2">
            <Link to='/signup'>
              Sign Up
            </Link>
          </div>

        </div>
        <ul className="lists-list">
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

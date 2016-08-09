import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists } from '../actions/index';
import { bindActionCreators } from 'redux';
import List from './lists';
import { Link } from 'react-router';

class ListGrid extends Component {
  componentWillMount() {
    this.props.fetchLists();
    this.state = {term: ""};
  }

  onInputChange(term) {
    this.setState({term: term});
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/"  className="navbar-brand">
                <img height="100%" src="./logo.png" alt="WanderList-logo" />
              </Link>
            </div>

            <div className="btn-toolbar">
              <Link to='/signup' className="btn btn-default navbar-btn navbar-right col-md-1">
                Sign Up
              </Link>
              <Link to='/login' className="btn btn-default navbar-btn navbar-right col-md-1">
                Log In
              </Link>
              <Link to="/lists/new" className="btn btn-primary navbar-btn navbar-right col-md-1">
                Add a list
              </Link>
              <form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" onChange={event => this.onInputChange(event.target.value)} />
                </div>
              </form>
            </div>

          </div>
        </nav>
        <ul className="list-group">
          {this.props.lists.filter(list => list.title.match(new RegExp(this.state.term, "gi"))).map((list, i) => <List {...this.props} key={i} i={i} list={list} />)}
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

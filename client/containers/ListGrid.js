import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists, fetchUserInfo } from '../actions/index';
import { bindActionCreators } from 'redux';
import List from './lists';
import { Link } from 'react-router';
import NavBar from '../components/nav';

export class ListGrid extends Component {
  componentWillMount() {
    this.props.fetchUserInfo();
    this.props.fetchLists();
    this.state = {term: ""};
  }

 onInputChange(term) {
    this.setState({term: term});
  }

  render() {
    return (
      <div>
      <NavBar auth={this.props.auth}/>
      <div className="row">
        <form className="navbar-form navbar-left">
          <div className="form-group navSearch">
            <input type="text" className="form-control" placeholder="Search" onChange={event => this.onInputChange(event.target.value)} />
          </div>
        </form>
      </div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid navContainer">
            <div className="navbar-header">
              <Link to="/"  className="navbar-brand">
                <img height="100%" src="./logo.png" alt="WanderList-logo" />
              </Link>
            </div>

            <div>
              <ul className="nav navbar-nav navBtns">
                <li className="active"><a href="#">Main<span className="sr-only">(current)</span></a></li>
                <li><a href="#">Favorites</a></li>
                <li><a href="#">My Lists</a></li>
                <li><a href="#">My Drafts</a></li>
              </ul>

              <form className="navbar-form navbar-left">
                <div className="form-group navSearch">
                  <input type="text" className="form-control" placeholder="Search" onChange={event => this.onInputChange(event.target.value)} />
                </div>
              </form>

              <div className="nav navbar-nav navbar-right mainBtns">
                <Link to="/lists/new" className="btn btn-primary navbar-nav">
                  Add a list
                </Link>
                <Link to='/login' className="btn btn-default">
                  Log In  <span className="caret"></span>
                </Link>
                <Link to='/signup' className="btn btn-default">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

        </nav>
        <ul className="list-group">
          {this.props.lists.filter(list => list.title.match(new RegExp("\\b".concat(this.state.term), "gi"))).map((list, i) => <List {...this.props} info={this.props.info} key={i} i={i} list={list} />)}
        </ul>
      </div>
    )
  }
};

function mapStateToProps(state) {

  return {
    lists: state.lists.all,
    info: state.lists.info
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists, fetchUserInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGrid);

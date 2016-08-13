import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists } from '../actions/index';
import { bindActionCreators } from 'redux';
import List from './lists';
import { Link } from 'react-router';
import NavBar from '../components/nav';

export class ListGrid extends Component {
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
      <NavBar auth={this.props.auth}/>
      <div className="row">
        <form className="navbar-form navbar-left">
          <div className="form-group navSearch">
            <input type="text" className="form-control" placeholder="Search" onChange={event => this.onInputChange(event.target.value)} />
          </div>
        </form>
      </div>
        <ul className="list-group">
          {this.props.lists.filter(list => list.title.match(new RegExp("\\b".concat(this.state.term), "gi"))).map((list, i) => <List {...this.props} key={i} i={i} list={list} />)}
        </ul>
      </div>
    )
  }
};

function mapStateToProps(state) {

  return {
    lists: state.lists.all,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGrid);

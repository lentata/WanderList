import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists, fetchUserInfo } from '../actions/index';
import { bindActionCreators } from 'redux';
import List from './lists';
import { Link } from 'react-router';
import NavBar from '../components/nav';
import {Panel} from 'react-bootstrap';

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
       <NavBar auth={this.props.auth} />
      
              
        <div>
        <Panel />
          <form>
            <input type="text" className="form-control" placeholder="Search" onChange={event => this.onInputChange(event.target.value)} />
          </form>
        </div>

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

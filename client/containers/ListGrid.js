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
        <NavBar />



        <Link to="/lists/new" className="btn btn-primary navbar-btn navbar-right col-md-1">
                Add a list
        </Link> 
        <div className="row">
          <div className="col-md-5">
            <form role="search">
              <div className="form-group">
                <input type="text" placeholder="Search" onChange={event => this.onInputChange(event.target.value)} />
              </div>
            </form>
          </div>
        </div>
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

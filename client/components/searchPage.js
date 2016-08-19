import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchedSearchLists, fetchedSearchCategories } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavBar from './nav';
import List from '../containers/lists';

export class SearchPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchedSearchLists(this.props.params.searchedTerm);
    this.props.fetchedSearchCategories(this.props.params.searchedTerm);
  }

  renderSearchedList(arr) {
    var out = [];
    for(var piece in arr) {
      out.push(arr[piece]);
    }
    if(!out.length){
      return "NOTHING FOUND";
    }

    console.log('PROPS BEFORE RENDER: ', this.props)
    return out.map((list, i) => <List {...this.props}
      info={this.props.info}
      votes={list.upvote - list.downvote}
      upLists={this.props.upLists}
      downLists={this.props.downLists}
      favoriteLists={this.props.favoriteLists}
      searchLists={this.props.searchLists}
      key={i}
      i={i}
      list={list} />);
  }

  render(){
    const { list, info } = this.props;
    return(
      <div>
        <NavBar />
        <ul>
          <h1>By Categories: {this.props.params.searchedTerm}</h1>
          <div className="search_by_cat_container">
            {this.renderSearchedList(this.props.searchCats)}
          </div>
          <h1>By Title: {this.props.params.searchedTerm}</h1>
          <div className="search_by_title_container">
            {this.renderSearchedList(this.props.searchLists)}
          </div>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.lists.all,
    info: state.lists.info,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists,
    favoriteLists: state.lists.favoriteLists,
    categoryLists: state.lists.categoryLists,
    searchLists: state.lists.searchLists,
    searchCats: state.lists.searchCats
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchedSearchLists, fetchedSearchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

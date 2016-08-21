import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchedSearchLists, fetchedSearchCategories } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavBar from './nav';
import List from '../containers/lists';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.renderSearchedList = this.renderSearchedList.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(index, last) {
    if(index === 0) {
      this.props.fetchedSearchCategories(this.props.params.searchedTerm);
    }
    if(index === 1) {
      this.props.fetchedSearchLists(this.props.params.searchedTerm);
    }
  }

  componentWillMount() {
    this.props.fetchedSearchLists(this.props.params.searchedTerm);
    this.props.fetchedSearchCategories(this.props.params.searchedTerm);
  }

  // componentWillUpdate(nextProps, nextStates) {
  //   this.props.fetchedSearchLists(nextProps.params.searchedTerm);
  //   this.props.fetchedSearchCategories(nextProps.params.searchedTerm);
  // }

  renderSearchedList() {
    return this.props.list.map((list, i) =>
      <List {...this.props}
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

    if (!this.props.list) {
      return (<div><img height="100%" src="../loading.gif" alt="loading" /></div>);
    }
    return (
      <div className="container">
        <NavBar />
        <Tabs onSelect={this.handleSelect}>
          <TabList>
            <Tab>Lists by Categories</Tab>
            <Tab>Lists by Headlines</Tab>
          </TabList>
          <TabPanel>
            <div className="search_by_cat_container">
              {this.renderSearchedList()}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="search_by_title_container">
              {this.renderSearchedList()}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchLists: state.lists.searchLists,
    searchCats: state.lists.searchCats,
    list: state.lists.all,
    info: state.lists.info,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists,
    favoriteLists: state.lists.favoriteLists,
    categoryLists: state.lists.categoryLists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchedSearchLists, fetchedSearchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

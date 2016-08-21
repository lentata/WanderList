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
    this.state = {
      tabNum: 0
    }
  }

  componentWillMount() {
    //this.props.fetchedSearchLists(this.props.params.searchedTerm);
    this.props.fetchedSearchCategories(this.props.params.searchedTerm);
  }

  componentWillUpdate(nextProps, nextState) {
    // this.props.fetchedSearchLists(nextProps.params.searchedTerm);
    if(this.props.params.searchedTerm !== nextProps.params.searchedTerm) {
      nextProps.fetchedSearchCategories(nextProps.params.searchedTerm);
      nextState.tabNum = 0;
    }
  }

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
        <Tabs className="search-tabs" selectedIndex={this.state.tabNum}>
          <TabList>
            <Tab onClick={() => {
              this.props.fetchedSearchCategories(this.props.params.searchedTerm);
              this.setState({tabNum: 0});
            }}>Lists by Categories</Tab>
            <Tab onClick={() => {
              this.props.fetchedSearchLists(this.props.params.searchedTerm);
              this.setState({tabNum: 1});
            }}>Lists by Headlines</Tab>
          </TabList>
          <TabPanel>
          </TabPanel>
          <TabPanel>
          </TabPanel>
        </Tabs>
        <div className="search_by_cat_container">
          {this.renderSearchedList()}
        </div>
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

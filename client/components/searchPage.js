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
      this.renderSearchedCat = this.renderSearchedCat.bind(this);
  }

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  componentWillMount() {
    this.props.fetchedSearchLists(this.props.params.searchedTerm)
    .then(()=>console.log("BLAHHHHH"));
    this.props.fetchedSearchCategories(this.props.params.searchedTerm).then(()=>console.log("GLAHHHHHZ"));
  }

  renderSearchedList() {
    return this.props.searchLists.map((list, i) => <List {...this.props}
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
    console.log('CATS:', this.props.searchCats);
    console.log('LISTS:', this.props.searchLists);

    const { list, info } = this.props;
    if (!this.props.searchCats || !this.props.searchLists) {
      return <div></div>
    }
    return (
      <div>
        <NavBar />

        <Tabs onSelect={this.handleSelect}>
          <TabList>
            <Tab>Lists by Categories</Tab>
            <Tab>Lists by Headlines</Tab>
          </TabList>
          <TabPanel>
            <h1>By Categories: {this.props.params.searchedTerm}</h1>
            <div className="search_by_cat_container">
              {this.renderSearchedCat(this.props.searchCats)}
            </div>
          </TabPanel>
          <TabPanel>
            <h1>By Title: {this.props.params.searchedTerm}</h1>
            <div className="search_by_title_container">
              {this.renderSearchedList(this.props.searchLists)}
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

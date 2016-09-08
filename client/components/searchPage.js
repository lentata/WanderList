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
    this.props.fetchedSearchCategories(this.props.params.searchedTerm);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.params.searchedTerm !== nextProps.params.searchedTerm) {
      nextProps.fetchedSearchCategories(nextProps.params.searchedTerm);
      nextState.tabNum = 0;
    }
  }

  renderSearchedList() {
    if (this.props.list.length === 0) {
      return <div className="search-not-found">Content Not Found!</div>;
    } else {
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
  }

  render(){
    const { list, info } = this.props;
    if (!this.props.list) {
      return (<div><img height="100%" src="../loading.gif" alt="loading" /></div>);
    }
    return (
      <div>
        <NavBar />
        <div className="mother_div">
          <div className="container">
            <div className="mainPage-tabs">
              <p className="category">Search results for: { this.props.params.searchedTerm }</p>
              <div className="col-md-7">
                <Tabs selectedIndex={ this.state.tabNum }>
                  <TabList>
                    <Tab onClick={ () => {
                      this.props.fetchedSearchCategories(this.props.params.searchedTerm);
                      this.setState({ tabNum: 0 });
                    } }>Lists by Categories</Tab>
                    <Tab onClick={ () => {
                      this.props.fetchedSearchLists(this.props.params.searchedTerm);
                      this.setState({ tabNum: 1 });
                    } }>Lists by Headlines</Tab>
                  </TabList>
                  <TabPanel>
                  </TabPanel>
                  <TabPanel>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>

          <ul className="list-group-search">
            {this.renderSearchedList()}
          </ul>
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
    categoryLists: state.lists.categoryLists,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchedSearchLists, fetchedSearchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

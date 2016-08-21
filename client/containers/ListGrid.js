import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists, fetchUserInfo, postQuant } from '../actions/index';
import { bindActionCreators } from 'redux';
import List from './lists';
import { Link, browserHistory, history } from 'react-router';
import NavBar from '../components/nav';
import { Pagination, Nav, NavItem, Button } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SearchBar from './searchBar';

export class ListGrid extends Component {
  constructor(props){
    super(props);
    this.state = {term: "", activePage: 1, filter: "new"};
    this.filterList = this.filterList.bind(this);
    this.searchWithEnter = this.searchWithEnter.bind(this);
  }

  componentWillMount() {
    let that = this;
    if(localStorage.getItem('logged')) {
      this.props.fetchUserInfo(JSON.parse(localStorage.getItem('userId')).userId);
    }
    this.props.fetchLists({type: 1, filter: this.state.filter});
    this.props.postQuant();
  }

  onInputChange(term) {
    this.setState({term: term});
  }

  handleSelect(eventKey) {
    this.setState({activePage: eventKey});
    this.props.fetchLists({type: eventKey,
    filter: this.state.filter});
  }

  filterList(prop){
    let that = this;
    this.setState({filter: prop}, function(x){
      that.props.fetchLists(
        {type: that.state.activePage,
         filter: that.state.filter
        }
      );
    });
  }

  searchWithEnter(event) {
    if(event.keyCode === 13) {
      browserHistory.push(`/search/${this.state.term}`);
    }
  }

  searchButton(){
    browserHistory.push('/search/' + this.state.term);

  }

  render() {

    if(!this.props.itemNo.items) {
      return (
        <div>
          <img height="100%" src="../loading.gif" alt="loading" />
        </div>
      );
    }

    return (
      <div>
        <NavBar />
        <div className="mother_div">
        <div className="container">
          <div className="mainPage-tabs">
            <div className="col-md-3">
              <Tabs>
                <TabList>
                  <Tab onClick={()=>this.filterList("new")}>New</Tab>
                  <Tab onClick={()=>this.filterList("top")}>Top</Tab>
                  <Tab onClick={()=>this.filterList("contro")}>Controversial</Tab>
                </TabList>
                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>

      <ul className="list-group">
        {this.props.lists
          .map((list, i) => <List {...this.props}
            info={this.props.info}
            votes={list.upvote - list.downvote}
            upLists={this.props.upLists}
            downLists={this.props.downLists}
            favoriteLists={this.props.favoriteLists}
            key={i}
            i={i}
            list={list} />)}

      </ul>
      <Pagination
        className={this.props.lists.length === 0 ? 'hidden' : 'shown'}
        prev
        next
        first
        last
        ellipsis
        items={Math.ceil(+this.props.itemNo.items / 10)}
        activePage={this.state.activePage}
        onSelect={this.handleSelect.bind(this)}
        >
      </Pagination>
    </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    lists: state.lists.all,
    info: state.lists.info,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists,
    favoriteLists: state.lists.favoriteLists,
    activePage: state.activePage,
    itemNo: state.itemsNo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists, fetchUserInfo, postQuant }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGrid);

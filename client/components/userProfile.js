import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, filterLists, fetchOthersInfo } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NavBar from './nav';
import List from '../containers/lists';


export class UserProfile extends Component {
  constructor(props){
    super(props);
    this.renderList = this.renderList.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  //PASS IN USER ID FROM OTHER USERS IN URL TO GET THEIR PROFILE
  componentWillMount(){
    this.props.fetchUserInfo(JSON.parse(localStorage.getItem('userId')).userId)
      .then(() => {
        if(this.props.params.id === JSON.parse(localStorage.getItem('userId')).userId) {
          this.props.filterLists(this.props.ownedLists.map(list => list._id.toString()))
        } else {
          this.props.fetchOthersInfo(this.props.params.id)
            .then(() => {
              this.props.filterLists(this.props.othersLists);
            });
        }
      });
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.location.pathname !== nextProps.location.pathname) {
      this.props.fetchUserInfo(JSON.parse(localStorage.getItem('userId')).userId)
        .then(() => {
          if(this.props.params.id === JSON.parse(localStorage.getItem('userId')).userId) {
            this.props.filterLists(this.props.ownedLists.map(list => list._id.toString()))
          } else {
            this.props.fetchOthersInfo(this.props.params.id)
              .then(() => {
                this.props.filterLists(this.props.othersLists);
              });
          }
        });
    }
  }

  handleSelect(index, last) {
    if(index === 0) {
      this.props.filterLists(this.props.ownedLists.map(list => list._id.toString()));
    } else if(index === 1) {
      this.props.filterLists(this.props.upLists);
    } else if(index === 2) {
      this.props.filterLists(this.props.downLists);
    } else if(index === 3) {
      this.props.filterLists(this.props.favoriteLists);
    }
  }

  renderList() {
    if(!this.props.list.length){
      return ("Add Some Lists");
    }
    return this.props.list.map((list, i) => <List {...this.props}
      info={this.props.info}
      votes={list.upvote - list.downvote}
      upLists={this.props.upLists}
      downLists={this.props.downLists}
      favoriteLists={this.props.favoriteLists}
      key={i}
      i={i}
      list={list} />);
  }

  render(){
    const { list, info, otherInfo, upLists, downLists, favoriteLists, ownedLists } = this.props;
    if(this.props.params.id === JSON.parse(localStorage.getItem('userId')).userId) {
      if(!upLists || !info) {
        return (<div><img height="100%" src="../loading.gif" alt="loading" /></div>);
      }
      return(
        <div>
          <NavBar />
          <img src={info.photo} alt="Profile Picture" />
          <h3>{info.username}</h3>
          <h3>{info.email}</h3>
          
          <Tabs onSelect={ this.handleSelect }>
            <TabList>
              <Tab>My Lists</Tab>
              <Tab>Upvoted Lists</Tab>
              <Tab>Downvoted Lists</Tab>
              <Tab>Favorite Lists</Tab>
            </TabList>

            <TabPanel>
              <ul>
                {this.renderList()}
              </ul>
            </TabPanel>
            <TabPanel>
              <ul>
                {this.renderList()}
              </ul>
            </TabPanel>
            <TabPanel>
              <ul>
                {this.renderList()}
              </ul>
            </TabPanel>
            <TabPanel>
              <ul>
                {this.renderList()}
              </ul>
            </TabPanel>
          </Tabs>
        </div>
      );
    } else {
      if(!otherInfo) {
        return (<div><img height="100%" src="../loading.gif" alt="loading" /></div>);
      }
      return(
        <div>
          <NavBar />
          <img src={otherInfo.photo} alt="Profile Picture" />
          <h3>{otherInfo.username}</h3>
          <h3>{otherInfo.email}</h3>
          
          <Tabs onSelect={ this.handleSelect }>
            <TabList>
              <Tab>Overview</Tab>
            </TabList>

            <TabPanel>
              <ul>
                {this.renderList()}
              </ul>
            </TabPanel>
          </Tabs>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    list: state.lists.all,
    info: state.lists.info,
    otherInfo: state.lists.otherInfo,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists,
    favoriteLists: state.lists.favoriteLists,
    ownedLists: state.lists.ownedLists,
    othersLists: state.lists.othersLists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserInfo, filterLists, fetchOthersInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

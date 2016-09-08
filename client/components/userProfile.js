import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, filterLists, fetchOthersInfo } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavBar from './nav';
import List from '../containers/lists';
import { Nav, NavItem } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  componentWillMount() {
    this.props.fetchUserInfo(JSON.parse(localStorage.getItem('userId')).userId)
      .then(() => {
        if (this.props.params.id === JSON.parse(localStorage.getItem('userId')).userId && localStorage.getItem('logged')) {
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
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.fetchUserInfo(JSON.parse(localStorage.getItem('userId')).userId)
        .then(() => {
          if (this.props.params.id === JSON.parse(localStorage.getItem('userId')).userId && localStorage.getItem('logged')) {
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

  renderList() {
    if (!this.props.list.length) {
      return ("Add Some Lists");
    }

    return this.props.list.map((list, i) => <List { ...this.props }
      info = { this.props.info }
      votes = { list.upvote - list.downvote }
      upLists = { this.props.upLists }
      downLists = { this.props.downLists }
      favoriteLists = { this.props.favoriteLists }
      key = { i }
      i = { i }
      list = { list } />);
  }

  render() {
    const { list, info, otherInfo, upLists, downLists, favoriteLists, ownedLists } = this.props;
    if (this.props.params.id === JSON.parse(localStorage.getItem('userId')).userId && localStorage.getItem('logged')) {
      if (!upLists || !info) {
        return (<div><img height="100%" src="../loading.gif" alt="loading" /></div>);
      }

      return (
        <div>
          <NavBar />
          <div className="mother_div">
            <div className="container">
              <div className="profile">
                <img className="profilePic" src={ info.photo } alt="Profile Picture" />
                <p className="pacifico">{ info.username }</p>
              </div>
              <div className="col-md-11">
                <div>
                  <Tabs>
                    <TabList>
                      <Tab onClick={ () => this.props.filterLists(ownedLists.map(list => String(list._id))) }>Overview</Tab>
                      <Tab onClick={ () => this.props.filterLists(upLists) }>Upvoted Lists</Tab>
                      <Tab onClick={ () => this.props.filterLists(downLists) }>Downvoted Lists</Tab>
                      <Tab onClick={ () => this.props.filterLists(favoriteLists) }>Favorite Lists</Tab>
                    </TabList>
                    <TabPanel>
                    </TabPanel>
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

            <ul className="profile-list-group">
              { this.renderList() }
            </ul>
          </div>
        </div>
        );
    } else {
      if (!otherInfo) {
        return (<div><img height="100%" src="../loading.gif" alt="loading" /></div>);
      }

      return (
        <div>
          <NavBar />
          <div className="mother_div">
            <div className="container">
              <div className="profile">
                <img className="profilePic" src={ otherInfo.photo } alt="Profile Picture" />
                <p className="pacifico">{ otherInfo.username }</p>
              </div>
              <div className="col-md-11">
                <div>
                  <Tabs>
                    <TabList>
                      <Tab>Overview</Tab>
                    </TabList>
                    <TabPanel>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
            <ul className="profile-list-group">
              {this.renderList()}
            </ul>
          </div>
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
    othersLists: state.lists.othersLists,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserInfo, filterLists, fetchOthersInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

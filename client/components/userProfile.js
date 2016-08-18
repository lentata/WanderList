import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, fetchListsForUser } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavBar from './nav';
import List from '../containers/lists';


export class UserProfile extends Component {
  constructor(props){
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  //PASS IN USER ID FROM OTHER USERS IN URL TO GET THEIR PROFILE
  componentWillMount(){
    var that = this;
    console.log('downvotedLists', this.props.downLists);
    this.props.fetchUserInfo(window.location.pathname.split('/')[2])
    .then(function(thing) {
      that.fetchMyUpvotes(that.props.info.upvotedLists, 'FETCH_UP');
      that.fetchMyUpvotes(that.props.downLists, 'FETCH_DOWN');
    });
  }
 
  fetchMyUpvotes(listIds, query){
    this.props.fetchListsForUser(listIds, query);
  }
  renderList(arr) {
    var out = [];
    for(var piece in arr) {
      out.push(arr[piece]);
    }
    return out.map((list, i) => <List {...this.props}
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
    const { list, info, upBoat } = this.props;
    console.log("upBoat", upBoat);
    if(!upBoat.upvotes || !upBoat.upvotes.data) {
      return (<div><img height="100%" src="../loading.gif" alt="loading" /></div>);
    }
    return(
      <div>
        <NavBar />
        <img src={info.photo} alt="Profile Picture" />
        <h3>{info.username}</h3>
        <h3>{info.email}</h3>
        <ul>
          <h1>Upvoted Lists</h1>
          {this.renderList(upBoat.upvotes.data)}
        </ul>
        <ul>
          <h1>Downvoted Lists</h1>
          {this.renderList(upBoat.downvotes.data)}


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
    upBoat: state.upvoter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserInfo, fetchListsForUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

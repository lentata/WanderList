import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, fetchListsForUser } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavBar from './nav';
import List from '../containers/lists';

/*.map((list, i) =>
           <List {...this.props} 
           info={this.props.info} 
           votes={list.upvote - list.downvote} 
           upLists={this.props.upLists} 
           downLists={this.props.downLists} 
           key={i} i={i} list={list} />)

*/
export class UserProfile extends Component {
  constructor(props){
    super(props);
    console.log("MADPROPS", props);
    this.renderList = this.renderList.bind(this);
  }
  componentWillMount(){
    var that = this;
    this.props.fetchUserInfo(window.location.pathname.split('/')[2])
    .then(function(thing) {
      console.log("THE THING", thing);
      that.fetchMyUpvotes(that.props.info.upvotedLists);
    });
  }

  fetchMyUpvotes(ids){
    this.props.fetchListsForUser(ids);
  }

  renderList(arr) {
    var out = [];
    for(var piece in arr) {
      console.log('piece', arr[piece]);
      out.push(arr[piece].title);
    }
    return out;
  }

  render(){
    const { upvote, downvote, list, info, upLists, downLists, upBoat } = this.props;
    console.log('userprofile', this.props);

    
    console.log('list', upBoat);

    if(!upBoat.upvotes || !upBoat.upvotes.data) {
      return (<div><img height="100%" src="../loading_gangnam.gif" alt="loading" /></div> 
        );
    }
  
    return(
      <div>
        <NavBar />
        <img src={info.photo} alt="Profile Picture" />
        <h3>{info.username}</h3>
        <h3>{info.email}</h3>
        <div>
         <h1>LISTSSSS</h1>

          
          {this.renderList(upBoat.upvotes.data)}
        </div>

        
      </div>
    );
    // {upBoat.upvotes.data}
  }
}


function mapStateToProps(state) {
  console.log("ProfileState", state);
  return {
    list: state.lists.all,
    info: state.lists.info,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists,
    upBoat: state.upvoter

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserInfo, fetchListsForUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

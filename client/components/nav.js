import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchRandomList } from '../actions/index';
import OurModal from '../containers/modal';
import { Button } from 'react-bootstrap';
import SignOut from './signoutButton';
import SearchBar from '../containers/searchBar';

export default class navBar extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.navigation.bind(this);
  }

  navigation(props){
    if(props === 'addList') {
    browserHistory.push(`/lists/new`);
    } else
    if(props==='profile'){
    browserHistory.push('/userProfile/' + JSON.parse(localStorage.getItem('userId')).userId);
    }
  }

  render(){

    return(
      <div>
        <nav className="navbar navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/"  className="navbar-brand">
                <img height="75%" src="../final_logo.png" alt="WanderList-logo" />
              </Link>
            </div>
            <SearchBar />
            <div className="nav navbar-nav navbar-right mainBtns">
              <li>
                <Button
                  onClick={()=>this.props.fetchRandomList()
                    .then(() => {browserHistory.push(`/lists/${this.props.id}`)
                  })}>
                  Surprise Me!
                </Button>
              </li>

              <li>
                {localStorage.getItem('logged') ?  <Button onClick={()=>this.navigation('addList')}>Add a list
                </Button> : <OurModal status={'Add a List'} /> }
              </li>

              <li>
                {localStorage.getItem('logged') ? <SignOut />  : <OurModal status={'Log in / Sign up'}/>}
              </li>

              <li>
                {localStorage.getItem('logged') ? <Button onClick={()=>this.navigation('profile')}>Profile</Button> : null }
              </li>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loginState: state,
    id: state.lists.id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRandomList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(navBar);

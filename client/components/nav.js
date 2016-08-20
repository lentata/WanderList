import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchRandomList } from '../actions/index';
import OurModal from '../containers/modal';
import { Button } from 'react-bootstrap';
import SignOut from './signoutButton';

export default class navBar extends Component {
  constructor(props) {
    super(props);
  }

  render(){

    return(
      <div>
        <nav className="navbar navbar-fixed-top navcol">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/"  className="navbar-brand">
                <img height="100%" src="../final_logo.png" alt="WanderList-logo" />
              </Link>
            </div>

            <div className="nav navbar-nav navbar-right mainBtns">
              <li>
                <Button
                  onClick={()=>this.props.fetchRandomList()
                    .then(() => {browserHistory.push(`/lists/${this.props.id}`)
                  })}>
                  Wanderlist!
                </Button>
              </li>

              <li>
                {localStorage.getItem('logged') ?  <Link to="/lists/new">Add a list
                </Link> : <OurModal status={'Add a List'} /> }
              </li>

              <li>
                {localStorage.getItem('logged') ? <SignOut />  : <OurModal status={'Log in or sign up'}/>}
              </li>

              <li>
                {localStorage.getItem('logged') ? <Link to={'/userProfile/' + JSON.parse(localStorage.getItem('userId')).userId}>Profile</Link> : null }
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

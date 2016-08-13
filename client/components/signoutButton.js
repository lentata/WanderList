import React, { Component } from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';

export default class SignOut extends Component {
  constructor(props){
    super(props);


  }
  signOutFunc(){
    console.log("HIIII");
    firebase.auth().signOut();
  }

  render(){
    
    return(
      <div>
        <form className="form-actions" onSubmit={this.signOutFunc}>
          <button type="submit" className="btn btn-warning">
            Log out
          </button>
        </form>
      </div>

    );
  }
}
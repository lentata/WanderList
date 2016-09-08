import React, { Component } from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import { Button } from 'react-bootstrap';

export default class SignOut extends Component {
  constructor(props){
    super(props);
  }

  signOutFunc(){
    firebase.auth().signOut();
    localStorage.removeItem("logged");
  }

  render(){
    return (
      <div>
        <form className="form-actions" onSubmit={ this.signOutFunc }>
          <Button type="submit">
            Log out
          </Button>
        </form>
      </div>
    );
  }
}

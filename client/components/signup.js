import React, { Component } from 'react';
import {Link} from 'react-router';

export default class SignUp extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Link to='/signup' className="btn btn-default">
        Sign Up
      </Link>
    );
  }
}
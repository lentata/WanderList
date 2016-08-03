import React, {Component} from 'react';
import {reduxForm} from 'redux-form';


export default class Login extends Component {
  render() {
    return (
      <form>
        <h2>Login</h2>
        <div> 
          <label>Username</label>
          <input type="text" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <button type="submit">submit</button>
      </form>
    );
  }
}

 // onSubmit={handleSubmit(this.onSubmit.bind(this))}>
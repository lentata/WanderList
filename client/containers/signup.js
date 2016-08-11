import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {userCreate} from '../actions/index';
import {Link} from 'react-router';

export class Signup extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    firebase.auth().createUserWithEmailAndPassword(props.username, props.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  render() {
    const {fields: {username, password}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h2>Signup</h2>
        <div>
          <label>Username</label>
          <input type="text" placeholder="Enter Username" {...username}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter Password" {...password}/>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        <Link to="/" className="btn btn-error">
          Cancel
        </Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signupForm',
  fields: ['username', 'password']
}, null, {userCreate})(Signup);

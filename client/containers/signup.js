import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {userCreate} from '../actions/index';
import {Link} from 'react-router';

export class Signup extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    var displayName = this.props.values.displayName;
    var email = this.props.values.username;
    var password = this.props.values.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: displayName
        })
      })
      .catch(function(error) {
        alert('Failed to sign up. ' + error.message);
      });
  }

  render() {
    const {fields: {displayName, username, password}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h2>Signup</h2>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Enter Your Name" {...displayName}/>
        </div>
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
  fields: ['displayName', 'username', 'password']
}, null, {userCreate})(Signup);

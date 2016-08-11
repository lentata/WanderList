import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {userAuth} from '../actions/index';
import {Link} from 'react-router';

var provider = null;

export class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  setProviderFacebook() {
    provider = new firebase.auth.FacebookAuthProvider();
  }

  setProviderGoogle() {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  setProviderGithub() {
    provider = new firebase.auth.GithubAuthProvider();
  }

  emailSignIn(props) {
    console.log('props: ', props)
    firebase.auth().signInWithEmailAndPassword(props.username, props.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    var user = firebase.auth().currentUser;
    if (user) {
      console.log("User is authenticated: ", user)
    } else {
      console.log("Try again")
    }
  }

  onSubmit(props) {
    if (!firebase.auth().currentUser) {

      firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        if(user) {
          console.log("User is authenticated: ", user)
        }
      // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      })
    } else {
        firebase.auth().signOut().then(function() {
          console.log("Sign-out successful")
        }, function(error) {
          console.log("An error happened")
      })};
  }

  render() {
    const {fields: {username, password}, handleSubmit, resetForm} = this.props;

    return (
      <div>
        <h2>Login</h2>
        <div onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <form onSubmit={handleSubmit(this.setProviderFacebook.bind(this))}>
            <button className="btn btn-block btn-social btn-facebook">
              <span className="fa fa-facebook" /> Sign in with Facebook
            </button>
          </form>
          <form onSubmit={handleSubmit(this.setProviderGoogle.bind(this))}>
            <button className="btn btn-block btn-social btn-google">
              <span className="fa fa-google" /> Sign in with Google
            </button>
          </form>
          <form onSubmit={handleSubmit(this.setProviderGithub.bind(this))}>
            <button className="btn btn-block btn-social btn-github">
              <span className="fa fa-github" /> Sign in with Github
            </button>
          </form>
        </div>

        <form className="form-actions" onSubmit={handleSubmit(this.emailSignIn.bind(this))}>
          <div className="form-group">
            <label>Username</label>
            <input type="username" className="form-control" {...username}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" className="form-control" {...password}/>
          </div>
          <Link to="/">
            <button type="button" className="btn btn-error">
              Cancel
            </button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
          <Link to="/signup" className="btn btn-error">
            <button type="submit" className="btn btn-error">
              Sign up
            </button>
          </Link>
        </form>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    authStatus: state.auth.authState
  }
}
export default reduxForm({
  form: 'loginForm',
  fields: ['username', 'password']
}, mapStateToProps, {userAuth})(Login);

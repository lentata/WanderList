import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {userAuth} from '../actions/index';
import {Link, browserHistory} from 'react-router';


var provider = null;

export class Login extends Component {
   constructor(props){
    super(props);
    Login.context = this.props;

  }
  static contextTypes = {
    router: PropTypes.object
  };

  emailSignIn(prop) {
    firebase.auth().signInWithEmailAndPassword(prop.username, prop.password).then(function(result) {
      alert("Logged in")
      var user = firebase.auth().currentUser;
      var userData = user.providerData[0]
      var userDataStorage = {
        displayName: userData.displayName,
        email: userData.email,
        photo: userData.photoURL,
        userId: userData.uid
      };
      Login.context.userAuth(userDataStorage);
      console.log('userauthfired');
      console.log('result in username signin: ', userDataStorage)
    }).catch(function(error) {
      alert(error.message)
    });
  }

  setProviderGoogle() {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  setProviderFacebook() {
    provider = new firebase.auth.FacebookAuthProvider();
  }

  setProviderGithub() {
    provider = new firebase.auth.GithubAuthProvider();
  }

  socialLogin(prop) {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // alert("Logged in")
      var token = result.credential.accessToken;
      var user = firebase.auth().currentUser;
      var userData = user.providerData[0]
      var userDataStorage = {
        displayName: userData.displayName,
        email: userData.email,
        photo: userData.photoURL,
        userId: user.uid
      };
      console.log("SOCIALLOGIN", user);
      Login.context.userAuth(userDataStorage);
      let logged = {logged: true};
      localStorage.setItem('logged', JSON.stringify(logged));
      console.log('result: ', userDataStorage);
      browserHistory.push('/');
    }).catch(function(error) {
      alert(error.message)
    });
  }




  render() {
    const {fields: {username, password}, handleSubmit, resetForm} = this.props;

    return (
      <div>
        <h2>Login</h2>
        <div onSubmit={handleSubmit(this.socialLogin.bind(this))}>
          <form onSubmit={handleSubmit(this.setProviderGoogle.bind(this))}>
            <button className="btn btn-block btn-social btn-google">
              <span className="fa fa-google" /> Sign in with Google
            </button>
          </form>
          <form onSubmit={handleSubmit(this.setProviderFacebook.bind(this))}>
            <button className="btn btn-block btn-social btn-facebook">
              <span className="fa fa-facebook" /> Sign in with Facebook
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
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
          <Link to="/">
            <button type="button" className="btn btn-error">
              Cancel
            </button>
          </Link>
          Need an account?
          <Link to="/signup" className="btn btn-error">
            <a type="submit" className="btn btn-error">
              Sign up
            </a>
          </Link>
        </form>

      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("MAPSTATE", state);
  return {
    authStatus: state.auth.authState
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userAuth }, dispatch);
}


export default reduxForm({
  form: 'loginForm',
  fields: ['username', 'password']
}, mapStateToProps, {userAuth})(Login);

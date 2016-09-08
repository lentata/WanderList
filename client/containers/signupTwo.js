import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { userCreate, userAuth, fetchUserInfo } from '../actions/index';
import { Link, browserHistory } from 'react-router';

export class Signup extends Component {
   constructor(props) {
    super(props);
    Signup.context = this.props;
    this.socialLogin = this.socialLogin.bind(this);
    this.provider = null;
    this.state = { showModal: false }
  }
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    let that = this;
    var displayName = this.props.values.displayName;
    var email = this.props.values.username;
    var password = this.props.values.password;
    var photoURL = this.props.values.photoURL;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: displayName,
          photoURL: photoURL
        })
        var logged = {logged: true};
        localStorage.setItem('logged', JSON.stringify(logged));
        browserHistory.push('/');
      })
      .catch(function(error) {
        alert('Failed to sign up. ' + error.message);
      });
  }

  setProvider(providerName, props) {
    switch(providerName) {
      case 'Google':
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.socialLogin(props);
        break;
      case 'Facebook':
        this.provider = new firebase.auth.FacebookAuthProvider();
        this.socialLogin(props);
        break;
      case 'Github':
        this.provider = new firebase.auth.GithubAuthProvider();
        this.socialLogin(props);
        break;
      default:
        throw new Error('providerName is not valid -_-');
    }
  }

  socialLogin(props) {
    firebase.auth().signInWithPopup(this.provider).then(function(result) {
      var user = firebase.auth().currentUser;
      var userData = user.providerData[0]
      var userDataStorage = {
        displayName: userData.displayName,
        email: userData.email,
        photo: userData.photoURL,
        userId: user.uid
      };
      Login.context.userAuth(userDataStorage);
      let logged = { logged: true };
      let userId = { userId: userDataStorage.userId }
      localStorage.setItem('logged', JSON.stringify(logged));
      localStorage.setItem('userId', JSON.stringify(userId));
      props.fetchUserInfo(userId.userId);
      browserHistory.push('/');
    }).catch(function(error) {
      alert(error.message)
    });
  }

  render() {
    const { fields: { username, password, displayName, photoURL }, handleSubmit, resetForm } = this.props;
    return (
      <div className="login-form_container">
        <div className="login-form_inner-container">
          <button onClick={ this.setProvider.bind(this, 'Google', this.props) } className="btn btn-block btn-social btn-google">
            <span className="fa fa-google" /> Sign up with Google
          </button>

          <button onClick={ this.setProvider.bind(this, 'Facebook', this.props) } className="btn btn-block btn-social btn-facebook">
            <span className="fa fa-facebook" /> Sign up with Facebook
          </button>

          <button onClick={ this.setProvider.bind(this, 'Github', this.props) } className="btn btn-block btn-social btn-github">
            <span className="fa fa-github" /> Sign up with Github
          </button>
        </div>

        <div className="login-signup__sep">
          <div className="login-signup__sep-text">or</div>
        </div>

        <form className="form-actions" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <div className="form-group">
            <label className="login_labels">Email</label>
            <input type="username" className="form-control login_inputs" placeholder="Enter Your Email" { ...username }/>
          </div>

          <div className="form-group">
            <label className="login_labels">Password</label>
            <input type="password" className="form-control login_inputs" placeholder="Enter Your Password" { ...password }/>
          </div>

          <div className="form-group">
            <label className="login_labels">Name</label>
            <input type="text" className="form-control login_inputs" placeholder="Enter Your Name" { ...displayName }/>
          </div>

          <div>
            <label className="login_labels">Profile Image URL</label>
            <input type="text" className="form-control login_inputs" placeholder="Enter Your Image URL" { ...photoURL }/>
          </div>

          <button type="submit" className="btn login_btn" onClick={ this.props.onClose }>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authStatus: state.auth.authState };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userAuth, fetchUserInfo }, dispatch);
}

export default reduxForm({
  form: 'signupForm',
  fields: ['username', 'password', 'displayName', 'photoURL']
}, mapStateToProps, { userCreate, userAuth, fetchUserInfo })(Signup);

import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import { userAuth } from '../actions/index';
import {Link} from 'react-router';


class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.userAuth(props)
      .then(() => {
        if (this.props.authStatus) {
          this.context.router.push('/');
        } else {
          this.props.resetForm();
        }
      });
  }

  render() {
    const {fields: {username, password}, handleSubmit, resetForm} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h2>Login</h2>
          <div> 
            <label>Username</label>
            <input type="text" {...username}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" {...password}/>
          </div>
          <button type="submit" className="btn btn-primary">Log In</button>
          <Link to="/" className="btn btn-error">
            Cancel
          </Link>
        </form>
        <Link to="/signup" className="btn btn-error">
          Don't have an account? Sign up here -->
        </Link>
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




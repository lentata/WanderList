import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {auth} from '../actions/index';


class Login extends Component {
  onSubmit(props) {
    console.log("PROPS",props);
    this.props.auth(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const {fields: {username, password}, handleSubmit} = this.props;
    return (
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
        <button type="submit">submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'loginForm',
  fields: [username, password]
}, null, {auth})(Login);
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
<<<<<<< 422a7acbe097c2ac5bc7d2de1ffdde14503bdf4f
import {userAuth} from '../actions/index';
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
<<<<<<< e580244eecda7701e337e188f846d6ad468a3098

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
=======
=======
import { auth } from '../actions/index';




class Login extends Component {
  

  onSubmit(props){
    console.log("omgeeeez", props);
    this.props.auth(props);
      
    this.context.router.push('/');
      

  }


  render() {
    const {fields: {username, password}, handleSubmit} = this.props;
    console.log(this.props);
>>>>>>> rebase merge
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h2>Login</h2>
        <div> 
          <label>Username</label>
<<<<<<< 422a7acbe097c2ac5bc7d2de1ffdde14503bdf4f
          <input type="text" {...username}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...password}/>
=======
          <input type="text" className="form-control" {...username} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" className="form-control" {...password} />
>>>>>>> rebase merge
        </div>
        <button type="submit">submit</button>
      </form>
>>>>>>> rebase merge
    );
  }
}

<<<<<<< e580244eecda7701e337e188f846d6ad468a3098


=======
<<<<<<< 422a7acbe097c2ac5bc7d2de1ffdde14503bdf4f
>>>>>>> rebase merge
function mapStateToProps(state) {
  return {
    authStatus: state.auth.authState
  }
}
export default reduxForm({
  form: 'loginForm',
  fields: ['username', 'password']
}, mapStateToProps, {userAuth})(Login);
<<<<<<< e580244eecda7701e337e188f846d6ad468a3098


=======
=======
export default reduxForm({
  form: "AuthLogin",
  fields: ['username', 'password']
}, null, {auth})(Login);


>>>>>>> rebase merge
>>>>>>> rebase merge

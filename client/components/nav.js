import React, { Component } from 'react';
import { Link } from 'react-router';


export default class navBar extends Component {
  constructor(props){
    super(props);
    this.deleteClick = this.deleteClick.bind(this);
  }
  deleteClick(){
    this.props.deletingClick(this.props.list.id);
  }

  render(){
    const { list, deleteClick } = this.props;
    return(
      <div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/"  className="navbar-brand">
                <img height="100%" src="../logo.png" alt="WanderList-logo" />
              </Link>
            </div>
             <div className="btn-toolbar">
              <Link to='/signup' className="btn btn-default navbar-btn navbar-right col-md-1">
               Sign Up
              </Link>
              <Link to='/login' className="btn btn-default navbar-btn navbar-right col-md-1">
               Log In
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

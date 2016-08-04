import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLists, upvote, downvote } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class Lists extends Component {
  componentWillMount() {
    this.props.fetchLists();
  }

  renderLists(){
    return this.props.lists.map((list) =>{
      return (
        <li className="list-group-item" key={ list.id }>
          <div className="row">

            <div className="col-md-1">
              <button className="fa fa-chevron-up" onClick={this.props.upvote}></button>
              <div>{list.upvote - list.downvote}</div>
              <button className="fa fa-chevron-down" onClick={this.props.downvote}></button>
            </div>

            <div className="col-md-2">
              <img className="img-thumbnail" src={list.content[0].img} />
            </div>

            <div className="col-md-5">
              <Link to={ "lists/" + list.id }>
                <strong>{ list.title }</strong>
              </Link>
              <div className="small"><em>{ list.author } &nbsp;</em>
              <span className="fa fa-commenting"> Comments: {list.comments.length} </span>

              </div>
              <div className="small fa fa-caret-square-o-right"><em>Categories: { list.categories }</em></div>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
          </div>
          <div className="col-md-2">
            <Link to="/lists/new" className="btn btn-primary">
              Add a list
            </Link>
          </div>
          <div className="col-md-2">
            <Link to='/login'>
              Log In
            </Link>
          </div>
          <div className="col-md-2">
            <Link to='/signup'>
              Sign Up
            </Link>
          </div>

        </div>

        <div className="row">
          <div className="col-md-10">
            <h3>Lists</h3>
            <ul className="list-group">
              { this.renderLists() }
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    lists: state.lists.all
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLists, upvote, downvote }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);

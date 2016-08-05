import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class Lists extends Component {

  renderLists(){
    const { list, i, upvote, downvote } = this.props;
      return (
<<<<<<< HEAD
=======
        <li className="list-group-item" key={ list.id }>
          <div className="row">

            <div className="col-md-1">
              <div className="fa fa-chevron-up"></div>
              <div>{list.upvote - list.downvote}</div>
              <div className="fa fa-chevron-down"></div>
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
    console.log(this.props)
    return (
      <div>
>>>>>>> master
        <div className="row">
          <div className="col-md-1">
            <button className="fa fa-chevron-up" onClick={upvote.bind(null, i)}></button>
            <div>{list.upvote - list.downvote}</div>
            <button className="fa fa-chevron-down" onClick={downvote.bind(null, i)}></button>
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
      );
    }

  render() {
    return (
      <div>
        <li>
          { this.renderLists() }
        </li>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upvote, downvote }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);

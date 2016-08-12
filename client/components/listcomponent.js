import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ListComponent extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const { list } = this.props;
    return(
        <div>
          <div className="col-md-1">
            <img className="img-thumbnail" src={list.content[0].image } />
          </div>

          <div className="media-body">
            <Link to={ "lists/" + list._id } className="media-heading">
              { list.title }
            </Link>
            <div className="small"><em>{ list.author } &nbsp;</em>
              <span className="fa fa-commenting"> Comments: {list.comments.length} </span>
            </div>
            <div className="small fa fa-caret-square-o-right"><em>Categories: { list.categories }</em></div>
          </div>
        </div>

    );
  }


}
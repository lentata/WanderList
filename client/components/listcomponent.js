import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

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

            <div>
              {/*<span className="glyphicon glyphicon-user"> {list.author} &nbsp;</span>*/}
              <span className="fa fa-user"/>
              <span> {list.author ? list.author : "¯\\_(ツ)_/¯"} &nbsp;</span>
              <span className="fa fa-clock-o"/>
              <span> {moment(list.createdAt).fromNow()} &nbsp;</span>
              <span className="fa fa-commenting"/> <span>{list.comments.length > 1 ? list.comments.length+" comments" : list.comments.length === 1 ? 1+" comment" : "leave a comment!"}</span>
            </div>
            <div>
              <span className="fa fa-flag-o"/>
              <span><em> #{ list.categories }</em></span>
            </div>
          </div>
        </div>

    );
  }


}

import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class ListComponent extends Component {
  constructor(props){
    super(props);
    this.toggleFavFunc = this.toggleFavFunc.bind(this);
  }

  toggleFavFunc(favStatus) {
    if (firebase.auth().currentUser) {
      this.props.favoriteAction(this.props.list._id, firebase.auth().currentUser.uid, favStatus);
    } else {
      alert("You must be signed in to favorite lists!");
    }
  }

  render(){
    const { list, info } = this.props;
    const favStatus = this.props.favoriteLists.includes(list._id.toString());
    return (
        <div className="list_main_container">
          <div className="list_image_container">
            <img className="img-thumbnail" src={list.content[0].image } />
          </div>

          <div className="list_overview_container">
            <div className="list_overview_fav fa fa-star fa-2x" style={{ color: favStatus ? "#ff3f00" : "grey" }} onClick={ this.toggleFavFunc.bind(this, favStatus) } />
            <Link to={ "/lists/" + list._id } className="media-heading list_overview_title">
              { list.title }
            </Link>

            <div className="list_overview_inner_container">
              <span className="fa fa-user list_overview_inner" />
              <span className="list_overview_words">
                &nbsp;<Link to={'/userProfile/' + this.props.list.authorId}>{ list.author ? list.author : "¯\\_(ツ)_/¯" }</Link>
              </span>

              <span className="fa fa-clock-o list_overview_inner" />
              <span className="list_overview_words">
                &nbsp;created { moment(list.createdAt).fromNow() }
              </span>

              <span className="fa fa-commenting list_overview_inner" />
              <span className="list_overview_words">
                &nbsp;{ list.comments.length > 1 ? list.comments.length + " comments" : list.comments.length === 1 ? "1 comment" : "no comments" }
              </span>
            </div>

            <div className="list_overview_cats">
              <span>
                { list.categories.map((category, i) => {
                  return (
                    <Link key={i} to={"/categoryPage/" + category}>
                      <span className="label label-default">
                        { category }
                      </span>
                    </Link>
                  );
                }) }
              </span>
            </div>
          </div>
        </div>
    );
  }
}

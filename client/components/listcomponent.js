import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class ListComponent extends Component {
  constructor(props){
    super(props);
    this.toggleFavFunc = this.toggleFavFunc.bind(this);
  }

  toggleFavFunc(favStatus) {
    if(firebase.auth().currentUser) {
      console.log('FAV!!!', favStatus);
      this.props.favoriteAction(this.props.list._id, firebase.auth().currentUser.uid, favStatus);
    } else {
      alert("You must be signed in to favorite lists!");
    }
  }

  render(){
    const { list, info } = this.props;

    const favStatus = this.props.favoriteLists.includes(list._id.toString());

    return(
        <div className="list_main_container">
          <img className="list_image_container img-thumbnail" src={list.content[0].image } />

          <div className="list_overview_container">
            <div className="list_overview_fav fa fa-star fa-2x" style={{color: favStatus ? "#ff3f00" : "grey"}} onClick={this.toggleFavFunc.bind(this, favStatus)} />
            <Link to={ "/lists/" + list._id } className="media-heading list_overview_title">
              { list.title }
            </Link>

            <div className="list_overview_inner_container">
              <div className="list_overview_inner fa fa-user">
                &nbsp;<Link to={'/userProfile/' + this.props.list.authorId}>{list.author ? list.author : "¯\\_(ツ)_/¯"}</Link>
              </div>

              <div className="list_overview_inner fa fa-clock-o">
                &nbsp;created {moment(list.createdAt).fromNow()}
              </div>

              <div className="list_overview_inner fa fa-commenting">
                &nbsp;{list.comments.length > 1 ? list.comments.length + " comments" : list.comments.length === 1 ? "1 comment" : "no comments"}
              </div>
            </div>

            <div className="list_overview_cats">
              <span>
                {list.categories.map((category, i) => {
                  return (
                    <Link key={i} to={"/categoryPage/" + category}>
                      <span className="label label-default">
                        { category }
                      </span>
                    </Link>
                  );
                })}
              </span>
            </div>
          </div>
        </div>
    );
  }
}

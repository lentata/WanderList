import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchList, deleteList } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import Comments from './comments';

class ListDetail extends Component {

  componentWillMount() {
    this.props.fetchList(this.props.params.id);
  }

  renderList() {
    console.log("RENDERLIST", this.props.list);
    return this.props.list.content.map((x, i) => {
      return (
        <div key={i}>
          <li>
            <h2>{x.headline}</h2>
            <img src={x.img} alt={x.headline} />
            <p>{x.desc}</p>
          </li>
        </div>
      );
    });
  }

  onDeleteClick() {
    this.props.deleteList(this.props.params.id)
      .then(() => {
        browserHistory.push('/');
      });
  }

  render() {
    const list = this.props.list;
    // const postComments = list.comments[postId] || [];
    // console.log("post comments 1", postComments);

    if(!list) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">

            <Link to="/">Back to All Lists</Link>

            <button
              className="btn btn-danger"
              onClick={ this.onDeleteClick.bind(this) }>
              Delete List
            </button>
          </div>

        </div>
        <div className="row">

          <div className="col-mid-3">
            <div className="pull-left m-l-5">
            <div className="fa fa-angle-up"></div>
            <h6>{ list.upvote - list.downvote }</h6>
            <div className="fa fa-angle-down"></div>
            </div>
          </div>

          <div className="col-mid-9">
            <div className="h1">{ list.title }</div>
            <h5>{ list.author } </h5>
            <h6>Categories: { list.categories }</h6>
            <ol>
              {this.renderList()}
           </ol>
          </div>

          <Comments {...this.props}/>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.lists.list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchList, deleteList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);

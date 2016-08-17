import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, fetchListsForUser, fetchListCategories } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavBar from './nav';
import List from '../containers/lists';

export class CategoryPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchListCategories(this.props.params.categories);
  }

  renderCatList(arr) {
    var out = [];
    for(var piece in arr) {
      out.push(arr[piece]);
    }

    return out.map((list, i) => <List {...this.props}
      info={this.props.info}
      votes={list.upvote - list.downvote}
      upLists={this.props.upLists}
      downLists={this.props.downLists}
      favoriteLists={this.props.favoriteLists}
      key={i}
      i={i}
      list={list} />);
  }

  render(){
    const { list, info } = this.props;
    return(
      <div>
        <NavBar />
        <ul>
          <h1>{this.props.params.categories}</h1>
          <div>
            {this.renderCatList(this.props.categoryLists)}
          </div>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.lists.all,
    info: state.lists.info,
    upLists: state.lists.upvotedLists,
    downLists: state.lists.downvotedLists,
    favoriteLists: state.lists.favoriteLists,
    categoryLists: state.lists.categoryLists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserInfo, fetchListsForUser, fetchListCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);

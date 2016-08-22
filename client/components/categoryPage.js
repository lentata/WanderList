import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListCategories } from '../actions/index';
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

  componentWillUpdate(nextProps, nextState) {
    if(this.props.params.categories !== nextProps.params.categories) {
      nextProps.fetchListCategories(nextProps.params.categories);
    }
  }

  renderCatList() {

    return this.props.list.map((list, i) => <List {...this.props}
      info={this.props.info}
      votes={list.upvote - list.downvote}
      upLists={this.props.upLists}
      downLists={this.props.downLists}
      favoriteLists={this.props.favoriteLists}
      searchLists={this.props.searchLists}
      key={i}
      i={i}
      list={list} />);
  }

  render(){
    const { list, info } = this.props;
    return(
      <div>
        <NavBar />
        <div className="mother_div">
          <div className="container">
            <div className="mainPage-tabs">
                <p className="category">Category: {this.props.params.categories}</p>
              </div>
          </div>
          <ul className="list-group">
            <div>
              {this.renderCatList()}
            </div>
          </ul>
        </div>
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
    searchLists: state.lists.searchLists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchListCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);

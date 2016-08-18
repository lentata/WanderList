import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchedSearchLists } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavBar from './nav';
import List from '../containers/lists';

export class SearchPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchedSearchLists(this.props.params.searchedTerm);
  }

  renderSearchedList(arr) {
    var out = [];
    for(var piece in arr) {
      out.push(arr[piece]);
    }

    console.log('PROPS BEFORE RENDER: ', this.props)
    return out.map((list, i) => <List {...this.props}
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
    console.log('THIS IS THIS.PROPS: ', this.props)
    return(
      <div>
        <NavBar />
        <ul>
          <h1>{this.props.params.searchedTerm}</h1>
          <div>
            {this.renderSearchedList(this.props.searchLists)}
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
    categoryLists: state.lists.categoryLists,
    searchLists: state.lists.searchLists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchedSearchLists }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

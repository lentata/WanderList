import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchList, deleteList } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';





class ListDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.fetchList(this.props.params.id);
  }

  onDeleteClick() {
  this.props.deleteList(this.props.params.id)
    .then( () => {
      this.context.router.push('/');
    });
  }

  render() {
    const list = this.props.list;

    if(!list) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back to All Lists</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={ this.onDeleteClick.bind(this) }>
          Delete List
        </button>
        <h3>{ list.title }</h3>
        <h4>{ list.author } </h4>
        <h6>Categories: { list.categories }</h6>
       
        <p>{ list.content }</p>

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

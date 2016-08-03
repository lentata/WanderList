import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchList, deleteList } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';



let y = 0;

class ListDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  }


  componentWillMount() {
    this.props.fetchList(this.props.params.id);
  }

  renderList(){
    console.log("RENDERLIST", this.props.list);
    return this.props.list.content.map((x)=> {
      return (
          <div>
            <li key={++y}>
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
        
        <div>
          <span className="fa fa-angle-up"></span>
          <h6>{+list.upvote - +list.downvote}</h6>
          <span className="fa fa-angle-down"></span>
          <h1>{ list.title }</h1>
        </div>


        <h5>{ list.author } </h5>
        <h6>Categories: { list.categories }</h6>

        <ol>  
          {this.renderList()}
        </ol>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class Lists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: {
        color: "grey"
      }
    }
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if(!nextProps.list.upflag && !nextProps.list.downflag) {
  //     this.setState({
  //       style: {
  //         color: "green"
  //       }
  //     });
  //     // console.log('upflag, downflag', this.props.list.upflag, this.props.list.downflag);
  //   }
  //   if(nextProps.list.upflag && !nextProps.list.downflag) {
  //     this.setState({
  //       style: {
  //         color: "blue"
  //       }
  //     });
  //     //console.log('upflag, downflag', this.props.list.upflag, this.props.list.downflag);
  //   }
  // }

  upvote(i, e) {
    if(!this.props.list.upflag) {
      this.setState({
        style: {
          color: "blue"
        }
      });
    } else {
      this.setState({
        style: {
          color: "grey"
        }
      });
    }
    this.props.upvote(i);
  }

  downvote(i, e) {
    if(!this.props.list.downflag) {
      this.setState({
        style: {
          color: "red"
        }
      });
    } else {
      this.setState({
        style: {
          color: "grey"
        }
      });
    }
    this.props.downvote(i);
  }

  componentWillMount() {
    if(this.props.list.upflag) {
      this.setState({
        style: {
          color: "green"
        }
      });
    } else if(this.props.list.downflag){
      this.setState({
        style: {
          color: "red"
        }
      });
    } else {
      this.setState({
        style: {
          color: "blue"
        }
      });
    }
  }

  renderLists() {
    const { list, i } = this.props;
    var { style } = this.state;
    return (
      <div className="media" key={ list.id }>
        <div className="row">

          <div className="col-md-1">
            <div className="text-center">
              <button className="text-center fa fa-chevron-up" onClick={this.upvote.bind(this, i)}></button>
            </div>
            <div style={style}>{list.upvote - list.downvote}</div>
            <div className="text-center">
              <button className="text-center fa fa-chevron-down" onClick={this.downvote.bind(this, i)}></button>
            </div>
          </div>

          <div className="col-md-1">
            <img className="img-thumbnail" src={list.content[0].img} />
          </div>

          <div className="media-body">
            <Link to={ "lists/" + list.id } className="media-heading">
              { list.title }
            </Link>
            <div className="small"><em>{ list.author } &nbsp;</em>
            <span className="fa fa-commenting"> Comments: {list.comments.length} </span>
            </div>
            <div className="small fa fa-caret-square-o-right"><em>Categories: { list.categories }</em></div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <li className="list-group-item">
          { this.renderLists() }
        </li>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upvote, downvote }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);

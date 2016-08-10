import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvote, downvote } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Votes from './vote';


class Lists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      upStyle: {
        color: "grey"
      },
      downStyle: {
        color: "grey"
      },
      numStyle: {
        color: "grey"
      }
    }
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  upvote(i, e) {
    if(!this.props.list.upflag) {
      this.setState({
        upStyle: {
          color: "blue"
        },
        downStyle: {
          color: "grey"
        },
        numStyle: {
          color: "blue"
        }
      });
    } else {
      this.setState({
        upStyle: {
          color: "grey"
        },
        downStyle: {
          color: "grey"
        },
        numStyle: {
          color: "grey"
        }
      });
    }
    this.props.upvote(i, this.props.list.id);
  }

  downvote(i, e) {
    if(!this.props.list.downflag) {
      this.setState({
        upStyle: {
          color: "grey"
        },
        downStyle: {
          color: "red"
        },
        numStyle: {
          color: "red"
        }
      });
    } else {
      this.setState({
        upStyle: {
          color: "grey"
        },
        downStyle: {
          color: "grey"
        },
        numStyle: {
          color: "grey"
        }
      });
    }
    this.props.downvote(i, this.props.list.id);
  }

  componentWillMount() {
    if(this.props.list.upflag) {
      this.setState({
        upStyle: {
          color: "blue"
        },
        downStyle: {
          color: "grey"
        },
        numStyle: {
          color: "blue"
        }
      });
    } else if(this.props.list.downflag){
      this.setState({
        upStyle: {
          color: "grey"
        },
        downStyle: {
          color: "red"
        },
        numStyle: {
          color: "red"
        }
      });
    } else {
      this.setState({
        upStyle: {
          color: "grey"
        },
        downStyle: {
          color: "grey"
        },
        numStyle: {
          color: "grey"
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.list.upflag) {
      this.setState({
        upStyle: {
          color: "blue"
        },
        downStyle: {
          color: "grey"
        },
        numStyle: {
          color: "blue"
        }
      });
    } else if(nextProps.list.downflag){
      this.setState({
        upStyle: {
          color: "grey"
        },
        downStyle: {
          color: "red"
        },
        numStyle: {
          color: "red"
        }
      });
    } else {
      this.setState({
        upStyle: {
          color: "grey"
        },
        downStyle: {
          color: "grey"
        },
        numStyle: {
          color: "grey"
        }
      });
    }
  }

  renderLists() {
    const { list, i, upvote, downvote } = this.props;
    return (
      <div className="media" key={ list.id }>
        <div className="row">

          <div className="col-md-1 text-center">
            <div>
              <i className="button fa fa-chevron-up" style={upStyle} onClick={this.upvote.bind(this, i)}></i>
            </div>
            <div style={numStyle}>{list.upvote - list.downvote}</div>
            <div>
              <i className="button fa fa-chevron-down" style={downStyle} onClick={this.downvote.bind(this, i)}></i>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ upvote, downvote }, dispatch);
}

export default connect(null, mapDispatchToProps)(Lists);

import React from 'react'
import store from '../reducers/index'

const VoteCounter = React.createClass({
  upvote() {
    store.dispatch({type: 'UPVOTE'})
  },

  downvote() {
    store.dispatch({type: 'DOWNVOTE'})
  },

  render() {
    return (
      <div>
        <button onClick={this.props.upvote}>Upvote</button>
        <button onClick={this.props.downvote}>Downvote</button>
      </div>
    )
  }
})

// <h3>{store.getState().votes}</h3>

export default VoteCounter

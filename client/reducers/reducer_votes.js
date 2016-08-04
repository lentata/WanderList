import { UPVOTE, DOWNVOTE } from '../actions/index';

// const INITIAL_STATE = {
//   upvote: 0,
//   downvote: 0
// }

const votes = (state = 0, action) => {
  switch(action.type) {
    case UPVOTE:
      console.log('state: ', state);
      return state + 1;
    case DOWNVOTE:
      console.log('state: ', state);
      return state - 1;
    default:
      return state;
  }
}

export default votes

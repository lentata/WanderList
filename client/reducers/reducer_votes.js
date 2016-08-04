import { UPVOTE, DOWNVOTE } from '../actions/index';

// const INITIAL_STATE = {
//   // upvote: 0,
//   // downvote: 0
//   votes: 0
// }

const votes = (state = [], action) => {
  switch(action.type) {
    case UPVOTE:
    const upI = action.index;
      return [
        ...state.slice(0,upI),
        {...state[upI], {upvote: state[upI].upvote + 1, downvote: state[upI].downvote}},
        ...state.slice(upI + 1),
      ];
    case DOWNVOTE:
    const downI = action.index;
      return [
        ...state.slice(0,downI),
        {...state[downI], upvote: state[downI].upvote, downvote: state[downI].downvote + 1},
        ...state.slice(downI + 1),
      ];
    default:
      return state;
  }
}

export default votes

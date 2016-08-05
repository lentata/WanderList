import { FETCH_LISTS, FETCH_LIST, UPVOTE, DOWNVOTE } from '../actions/index';

const INITIAL_STATE = {
  all: [],
  list: null
};

export default function(state = INITIAL_STATE, action) {
  let targetList = state.all[action.index];
  if(action.type === FETCH_LIST) {
    return { ...state, list: action.payload.data };
  } else if(action.type === FETCH_LISTS) {
    return {
      ...state, all: action.payload.data.lists
    };
  } else if(action.type === UPVOTE) {
    return {
      ...state,
      all:[
        ...state.all.slice(0, action.index),
        Object.assign({}, targetList, ++targetList.upvote),
        ...state.all.slice(action.index + 1)
      ]
    };
  } else if(action.type === DOWNVOTE) {
    return {
      ...state,
      all:[
        ...state.all.slice(0, action.index),
        Object.assign({}, targetList, ++targetList.downvote),
        ...state.all.slice(action.index + 1)
      ]
    };
  } else {
    return state;
  }
}

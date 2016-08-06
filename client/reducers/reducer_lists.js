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
    console.log("lists payload ", action.payload.data);
    return {
      ...state, all: action.payload.data.lists
    };
  } else if(action.type === UPVOTE) {
    console.log('UPVOTE action.payload: ', action.payload.data);
    const up = action.payload.data.up;
    const down = action.payload.data.down;
    targetList.upvote = +targetList.upvote + (+up);
    targetList.downvote = +targetList.downvote + (+down);
    return {
      ...state,
      all:[
        ...state.all.slice(0, action.index),
        Object.assign({}, targetList, targetList.upvote, targetList.downvote),
        ...state.all.slice(action.index + 1)
      ]
    };
  } else if(action.type === DOWNVOTE) {
    console.log('DOWNVOTE action.payload: ', action.payload.data);
    const up = action.payload.data.up;
    const down = action.payload.data.down;
    targetList.upvote = +targetList.upvote + (+up);
    targetList.downvote = +targetList.downvote + (+down);
    return {
      ...state,
      all:[
        ...state.all.slice(0, action.index),
        Object.assign({}, targetList, targetList.upvote, targetList.downvote),
        ...state.all.slice(action.index + 1)
      ]
    };
  } else {
    return state;
  }
}

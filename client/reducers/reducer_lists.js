import { FETCH_LISTS, FETCH_LIST } from '../actions/index';

const INITIAL_STATE = {
  all: [],
  list: null
};

export default function(state = INITIAL_STATE, action) {
  console.log('ACTION:', action);
  if(action.type === FETCH_LIST) {
    return { ...state, list: action.payload.data };
  }
  else if(action.type === FETCH_LISTS) {
    return {
      ...state, all: action.payload.data.lists
    };
  } else {
    return state;
  }
}

import {FETCH_UP, FETCH_DOWN} from '../actions/index';

const INITIAL_STATE = {
  upvotes: [],
  downvotes: []
};


export default function(state = INITIAL_STATE, action) {
  console.log("upboat captain", state);
  switch(action.type) {
    case FETCH_UP:
      return { ...state, upvotes: action.payload} ;
      //return state;
    case FETCH_DOWN:
      return { ...state, downvotes: action.payload}
    default:
      return state;
  }
}
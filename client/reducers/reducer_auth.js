import {AUTH_IN} from '../actions/index';

const INITIAL_STATE = {authState: null};

export default function(state = INITIAL_STATE, action) {
  console.log("REDUCER!!!", action);
  switch(action.type) {
    case AUTH_IN:
      return {...state, authIn: true};
    default:
      return state;
  }
}
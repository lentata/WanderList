import { ITEM_NO } from '../actions/index';

const INITIAL_STATE = {
  items: 0
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ITEM_NO:
      return { ...state, items: action.payload.data };
    default:
      return state;
  }
}

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

// export default function() {
//   return [
//     {title: 'Fattest hamburger', author: 'stephen', votes: 25, '1': "pearls", '2': "superduper"},
//     {title: 'Fattest hotdogs', author: 'yihui', votes: 30, '1': "scooters", '2': "Annies"},
//     {title: 'HOTTODOGGU!', author: 'George', votes: 10, '1': 'Shawn', '2': 'Wasabi'}
//   ];
// }

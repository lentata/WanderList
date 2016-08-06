import { ADD_COMMENT, REMOVE_COMMENT } from '../actions/index';

function postComments(state = [], action) {
  // console.log("STATE:", state, "ACTION:", action);
  if(action.type === 'ADD_COMMENT') {
    //return the new state with the new comment. state is an object, each prop is an id, value per prop is array of objs with text (val is comment text) and user (inputed user) as props. state is basically an object holding all comments here
    return [...state, {
      user: action.author,
      text: action.comment
    }];
  } else if(action.type === 'REMOVE_COMMENT') {
    console.log("removing a comment");
    //return new state without the deleted user comment
    return [
      //from the start to the one we want to delete
      ...state.slice(0, action.i),
      //after the deleted one to the end
      ...state.slice(action.i + 1)
    ]
  } else {
    return state;
  }
}

function comments(state = [], action) {
  if(typeof action.postId !== 'undefined') {
    //...state are values from state
    //overwrite this post with a new one
    return {
      ...state,
      [action.postId]: postComments(state[action.postId], action)
    }
  } else {
    return state;
  }
}

export default comments;

//see ...state above for removing comment
//e.g. want to remove 3 from [1,2,3,4]
//replace array with [1,2,4]

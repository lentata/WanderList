import { FETCH_LISTS, FETCH_LIST, UPVOTE, DOWNVOTE, ADD_COMMENT, REMOVE_COMMENT } from '../actions/index';

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

    const { up, down, upvoteColor, downvoteColor, voteCountColor } = action.payload.data;
    console.log('action.payload: ', action.payload);
    targetList.upvote = +targetList.upvote + (+up);
    targetList.downvote = +targetList.downvote + (+down);
    targetList.upvoteColor = { color: upvoteColor };
    targetList.downvoteColor = { color: downvoteColor };
    targetList.voteCountColor = {color: "grey"};
    return {
      ...state,
      all:[
        ...state.all.slice(0, action.index),
        Object.assign({}, targetList, targetList.upvote, targetList.downvote, targetList.voteCountColor),
        ...state.all.slice(action.index + 1)
      ],
      color:[
        ...state.all.map((list, i) => {color: "black"}).slice(0, action.index),
        Object.assign({}, targetList.voteCountColor),
        ...state.all.map((list, i) => {color: "black"}).slice(action.index + 1)
      ]
    };
  } else if(action.type === DOWNVOTE) {
    const { up, down, upvoteColor, downvoteColor, voteCountColor } = action.payload.data;

    targetList.upvote = +targetList.upvote + (+up);
    targetList.downvote = +targetList.downvote + (+down);
    targetList.upvoteColor = { color: upvoteColor };
    targetList.downvoteColor = { color: downvoteColor };
    targetList.voteCountColor = { color: voteCountColor };
    return {
      ...state,
      all:[
        ...state.all.slice(0, action.index),
        Object.assign({}, targetList, targetList.upvote, targetList.downvote, targetList.upvoteColor, targetList.downvoteColor, targetList.voteCountColor),
        ...state.all.slice(action.index + 1)
      ]
    };
  } else if(action.type === ADD_COMMENT){
    return {
      ...state,
        list:{
          ...state.list,
          comments: [
            ...state.list.comments,
            JSON.parse(action.payload.config.data)
          ]
        }
    }

  } else {
    return state;
  }
}

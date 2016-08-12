import { USER_INFO,FETCH_LISTS, FETCH_LIST, UPVOTE, DOWNVOTE, ADD_COMMENT, REMOVE_COMMENT, CREATE_LIST } from '../actions/index';

const INITIAL_STATE = {
  all: [],
  list: null,
  createdList: null,
  info: null
};

export default function(state = INITIAL_STATE, action) {
  if(action.type === FETCH_LIST) {
    return { ...state, list: action.payload.data };
  } else if(action.type === CREATE_LIST) {
    console.log('createdList', action.payload.data);
    return { ...state, createdList: action.payload.data};
  } else if(action.type === USER_INFO) {
    return { ...state, info: action.payload.data };
  } else if(action.type === FETCH_LISTS) {
    return {
      ...state, all: action.payload.data
    };
  } else if(action.type === UPVOTE) {
    const { up, down } = action.payload.data;
    let index = 0;
    state.all.forEach((list, i) => {
      if (list._id.toString() === action.id) {
        index = i;
      }
    });
    let targetList = state.all[index];
    targetList.upvote = +targetList.upvote + (+up);
    targetList.downvote = +targetList.downvote + (+down);
    return {
      ...state,
      all:[
        ...state.all.slice(0, index),
        Object.assign({}, targetList, targetList.upvote, targetList.downvote),
        ...state.all.slice(index + 1)
      ]
    };
  } else if(action.type === DOWNVOTE) {
    const { up, down } = action.payload.data;
    let index = 0;
    state.all.forEach((list, i) => {
      if (list._id.toString() === action.id) {
        index = i;
      }
    });
    let targetList = state.all[index];
    targetList.upvote = +targetList.upvote + (+up);
    targetList.downvote = +targetList.downvote + (+down);
    return {
      ...state,
      all:[
        ...state.all.slice(0, index),
        Object.assign({}, targetList, targetList.upvote, targetList.downvote),
        ...state.all.slice(index + 1)
      ]
    };
  } else if(action.type === ADD_COMMENT) {
    console.log('new comment added read by reducer!', action.payload);
    // console.log('PAYLOAD:', action.payload);
    console.log('PAYLOAD CONFIG:', action.payload.config);
    return {
      ...state,
        list:{
          ...state.list,
          comments: [
            ...state.list.comments,
            // action.payload.data
            JSON.parse(action.payload.config.data)
          ]
        }
    }

  } else if(action.type === REMOVE_COMMENT) {
    console.log("REMOVE PAYLOAD", action.payload.data.comments);
      return {
        ...state,
        list: {
          ...state.list,
          comments: [
            ...state.list.comments.slice(0, action.commentIndex),
            //after the deleted one to the end
            ...state.list.comments.slice(action.commentIndex + 1)
          ]
        }
      }
  } else {
    return state;
  }
}

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

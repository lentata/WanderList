import { USER_INFO,
         FETCH_LISTS,
         FETCH_LIST,
         FETCH_RANDOM,
         UPVOTE,
         DOWNVOTE,
         FETCHCATEGORIES,
         SEARCHLISTS,
         SEARCHCATS,
         TOGGLEFAV,
         ADD_COMMENT,
         REMOVE_COMMENT,
         FILTER_LISTS,
         CREATE_LIST } from '../actions/index';

const INITIAL_STATE = {
  all: [],
  list: null,
  id: null,
  createdList: null,
  info: null,
  upvotedLists: [],
  downvotedLists: [],
  favoriteLists: [],
  categoryLists: [],
  searchLists: [],
  ownedLists: []
};

export default function(state = INITIAL_STATE, action) {
  if(action.type === FETCH_LIST) {
    return { ...state, list: action.payload.data };
  } else if(action.type === FETCH_RANDOM) {
    return { ...state, id: action.payload.data._id, list: action.payload.data };
  } else if(action.type === CREATE_LIST) {
    return { ...state, createdList: action.payload.data};
  } else if(action.type === USER_INFO) {
    return { ...state,
      info: action.payload.data.user,
      upvotedLists: action.payload.data.user.upvotedLists,
      downvotedLists: action.payload.data.user.downvotedLists,
      favoriteLists: action.payload.data.user.favLists,
      ownedLists: action.payload.data.lists 
    };
  } else if(action.type === FETCH_LISTS) {
    return {
      ...state, all: action.payload.data
    };
  } else if(action.type === UPVOTE) {
    let index = 0;
    let upIndex = state.upvotedLists.indexOf(action.id);
    let downIndex = state.downvotedLists.indexOf(action.id);
    state.all.forEach((list, i) => {
      if (list._id.toString() === action.id) {
        index = i;
      }
    });
    let targetList = state.all[index];
    if (upIndex === -1) {
      if (downIndex === -1) {
        targetList.upvote += 1;
        return {
          ...state,
          all:[
            ...state.all.slice(0, index),
            Object.assign({}, targetList, targetList.upvote),
            ...state.all.slice(index + 1)
          ],
          upvotedLists: [
            ...state.upvotedLists,
            action.id
          ],
          list: targetList
        };
      } else {
        targetList.upvote += 1;
        targetList.downvote -= 1;
        return {
          ...state,
          all:[
            ...state.all.slice(0, index),
            Object.assign({}, targetList, targetList.upvote, targetList.downvote),
            ...state.all.slice(index + 1)
          ],
          upvotedLists: [
            ...state.upvotedLists,
            action.id
          ],
          downvotedLists: [
            ...state.downvotedLists.slice(0, downIndex),
            ...state.downvotedLists.slice(downIndex + 1)
          ],
          list: targetList
        };
      }
    } else {
      targetList.upvote -= 1;
      return {
        ...state,
        all:[
          ...state.all.slice(0, index),
          Object.assign({}, targetList, targetList.upvote),
          ...state.all.slice(index + 1)
        ],
        upvotedLists: [
          ...state.upvotedLists.slice(0, upIndex),
          ...state.upvotedLists.slice(upIndex + 1)
        ],
        list: targetList
      };
    }
  } else if(action.type === DOWNVOTE) {
    let index = 0;
    let upIndex = state.upvotedLists.indexOf(action.id);
    let downIndex = state.downvotedLists.indexOf(action.id);
    state.all.forEach((list, i) => {
      if (list._id.toString() === action.id) {
        index = i;
      }
    });
    let targetList = state.all[index];
    console.log('the target list', targetList);
    if (downIndex === -1) {
      if (upIndex === -1) {
        targetList.downvote += 1;
        return {
          ...state,
          all:[
            ...state.all.slice(0, index),
            Object.assign({}, targetList, targetList.downvote),
            ...state.all.slice(index + 1)
          ],
          downvotedLists: [
            ...state.downvotedLists,
            action.id
          ],
          list: targetList
        };
      } else {
        targetList.downvote += 1;
        targetList.upvote -= 1;
        return {
          ...state,
          all:[
            ...state.all.slice(0, index),
            Object.assign({}, targetList, targetList.upvote, targetList.downvote),
            ...state.all.slice(index + 1)
          ],
          downvotedLists: [
            ...state.downvotedLists,
            action.id
          ],
          upvotedLists: [
            ...state.upvotedLists.slice(0, upIndex),
            ...state.upvotedLists.slice(upIndex + 1)
          ],
          list: targetList
        };
      }
    } else {
      targetList.downvote -= 1;
      return {
        ...state,
        all:[
          ...state.all.slice(0, index),
          Object.assign({}, targetList, targetList.downvote),
          ...state.all.slice(index + 1)
        ],
        downvotedLists: [
          ...state.downvotedLists.slice(0, downIndex),
          ...state.downvotedLists.slice(downIndex + 1)
        ],
        list: targetList
      };
    }
  } else if(action.type === ADD_COMMENT) {
    return {
      ...state,
        list: {
          ...state.list,
          comments: [
            ...state.list.comments,
            JSON.parse(action.payload.config.data)
          ]
        }
    }

  } else if(action.type === REMOVE_COMMENT) {
      return {
        ...state,
        list: {
          ...state.list,
          comments: [
            ...state.list.comments.slice(0, action.commentIndex),
            ...state.list.comments.slice(action.commentIndex + 1)
          ]
        }
      }
  } else if(action.type === TOGGLEFAV) {
      if(action.fav) {
        const index = state.favoriteLists.indexOf(action.id);
        return {
          ...state,
          favoriteLists: [
            ...state.favoriteLists.slice(0, index),
            ...state.favoriteLists.slice(index + 1)
          ]
        }
      } else {
        return {
          ...state,
          favoriteLists: [
            ...state.favoriteLists,
            action.id
          ]
        }
      }
  } else if(action.type === FETCHCATEGORIES) {
    return {
      ...state,
      all: action.payload.data
    };
  } else if(action.type === SEARCHLISTS) {
    return {
      ...state,
      searchLists: [...action.payload.data]
    };
  } else if(action.type === FILTER_LISTS) {
    return {
      ...state,
      all: action.payload.data
    }
  } else if(action.type === SEARCHCATS) {
    return {
      ...state,
      searchCats: [...action.payload.data]
    };
  } else {
    return state;
  }
}

import axios from 'axios';

export const USER_INFO = 'USER_INFO';
export const FETCH_LISTS = 'FETCH_LISTS';
export const FETCH_LIST = 'FETCH_LIST';
export const FETCH_RANDOM = 'FETCH_RANDOM';
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const AUTH_IN = 'AUTH_IN';
export const SIGN_UP = 'SIGN_UP';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const FETCHCATEGORIES = 'FETCHCATEGORIES';
export const SEARCHLISTS = 'SEARCHLISTS';
export const TOGGLEFAV = 'TOGGLEFAV';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const FETCH_UP = 'FETCH_UP';
export const FETCH_DOWN = 'FETCH_DOWN';
export const ITEM_NO = 'ITEM_NO';
export const FILTER_LISTS = 'FILTER_LISTS';

export function fetchUserInfo(uid) {
  const request = axios.get(`/api/user/${uid}`);
  return {
    type: USER_INFO,
    payload: request
  };
}
//Props here is userID
export function fetchListsForUser(props, query) {
  const request = axios.post(`/api/lists/upvote`, props);
  return {
    type: query,
    payload: request
  };
}

export function filterLists(props) {
  const query = JSON.stringify(props);
  const request = axios.get(`/api/lists/votelist?ids=${query}`);
  return {
    type: FILTER_LISTS,
    payload: request
  }
}

//Pagination Post request for lists
export function fetchLists(props) {
  // console.log("ACTION", props);
  const request = axios.post(`/api/lists1`, props);
  return {
    type: FETCH_LISTS,
    payload: request
  };
}

export function fetchList(id) {
  const request = axios.get(`/api/lists/${id}`);
  return {
    type: FETCH_LIST,
    payload: request
  };
}

export function fetchRandomList() {
  const request = axios.get(`/api/random`);
  return {
    type: FETCH_RANDOM,
    payload: request
  };
}

export function createList(props) {
  props.author = firebase.auth().currentUser ? firebase.auth().currentUser.displayName : "idk  ¯\_(ツ)_/¯";
  props.authorId = firebase.auth().currentUser.uid;
  const request = axios.post(`/api/lists`, props);
  return {
    type: CREATE_LIST,
    payload: request
  };
}

export function deleteList(id) {
  const request = axios.delete(`/api/lists/${id}`);
  return {
    type: DELETE_LIST,
    payload: request
  };
}

export function userAuth(props) {
  console.log("AUTH IN HAS BEEN HIT", props);
  const request = axios.post(`/api/auth`, props);
  return {
    type: AUTH_IN,
    payload: request
  };
}

export function upvote(lid, uid) {
  const data = {
    lid: lid,
    votes: true,
    uid: uid
  };
  const request = axios.post(`/api/votes`, data);
  return {
    type: UPVOTE,
    id: lid
  };
}

export function downvote(lid, uid) {
  const data = {
    lid: lid,
    votes: false,
    uid: uid
  };
  const request = axios.post(`/api/votes`, data);
  return {
    type: DOWNVOTE,
    id: lid
  };
}

export function fetchListCategories(categories) {
  const request = axios.get(`/api/categoryPage/${categories}`);
  return {
    type: FETCHCATEGORIES,
    payload: request
  };
}

export function fetchedSearchLists(searchedTerm) {
  const request = axios.get(`/api/search/${searchedTerm}`);
  return {
    type: SEARCHLISTS,
    payload: request
  };
}

export function favorite(lid, uid, favStatus) {
  const data = {
    lid: lid,
    favorite: favStatus,
    uid: uid
  };
  const request = axios.post(`/api/favorite`, data);
  return {
    type: TOGGLEFAV,
    id: lid,
    fav: favStatus
  };
}

export function addComment(postId, userId, author, comment) {
  const data = {
    _id: postId,
    userId: userId,
    user: author,
    text: comment
  };

  const request = axios.post(`/api/comments`, data);
  return {
    type: ADD_COMMENT,
    payload: request
  }
}

export function removeComment(listId, commentIndex) {
  const data = {
    commentIndex
  }
  const request = axios.post(`/api/comments/${listId}`, data)

  return {
    type: REMOVE_COMMENT,
    listId,
    commentIndex,
    payload: request
  }
}

export function postQuant(){
  const request = axios.get(`/api/list`);

  return {
    type: ITEM_NO,
    payload: request
  }
}

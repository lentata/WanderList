import axios from 'axios';

export const FETCH_LISTS = 'FETCH_LISTS';
export const FETCH_LIST = 'FETCH_LIST';
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const AUTH_IN = 'AUTH_IN';
export const SIGN_UP = 'SIGN_UP';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export function fetchLists() {
  const request = axios.get('/api/lists');
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

export function createList(props) {
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
  const request = axios.get(`/api/auth?username=${props.username}&password=${props.password}`);
  return {
    type: AUTH_IN,
    payload: request
  };
}

export function userCreate(props) {
  const request = axios.post('/api/auth', props);
  return {
    type: SIGN_UP,
    payload: request
  };
}

export function upvote(index) {
  const data = {
    votes: true,
    index: index
  };
  const request = axios.post(`/api/votes`, data);
  return {
    type: UPVOTE,
    index: index,
    payload: request
  };
}

export function downvote(index) {
  const data = {
    votes: false,
    index: index
  };
  const request = axios.post(`/api/votes`, data);
  return {
    type: DOWNVOTE,
    index: index,
    payload: request
  };
}

//FOR COMMENTS
export function addComment(postId, author, comment) {
  console.log("dispatching add comment!");
  return {
    type: ADD_COMMENT,
    postId,
    author,
    comment
  }
}

//remove comment
export function removeComment(postId, i) {
  return {
    type: REMOVE_COMMENT,
    i,
    postId
  }
}

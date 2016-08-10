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

export function upvote(id) {
  const data = {
    votes: true,
    id: id
  };
  const request = axios.post(`/api/votes`, data);
  return {
    type: UPVOTE,
    id: id,
    payload: request
  };
}

export function downvote(id) {
  const data = {
    votes: false,
    id: id
  };
  const request = axios.post(`/api/votes`, data);
  return {
    type: DOWNVOTE,
    id: id,
    payload: request
  };
}

export function addComment(postId, author, comment) {
  const data = {
    id: postId,
    user: author,
    text: comment
  }
  const request = axios.post(`/api/comments`, data);
  console.log(request);
  return {
    type: ADD_COMMENT,
    payload: request
  }
}

//remove comment, need to get this to work
export function removeComment(postId, i) {
  console.log("removing a comment!");
  return {
    type: REMOVE_COMMENT,
    i,
    postId
  }
}

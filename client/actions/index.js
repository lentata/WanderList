import axios from 'axios';

export const FETCH_LISTS = 'FETCH_LISTS';
export const FETCH_LIST = 'FETCH_LIST';
export const CREATE_LIST = "CREATE_POST";
export const DELETE_LIST = 'DELETE_LIST';

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
  const request = axios.post(`/api/lists`,props);
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

import axios from 'axios';

export const FETCH_LISTS = 'FETCH_LISTS';
export const FETCH_LIST = 'FETCH_LIST';
export const DELETE_LIST = 'DELETE_LIST';

export function fetchLists() {
  const request = axios.get('/api/lists');
  console.log('REQUEST:', request);
  return {
    type: FETCH_LISTS,
    payload: request
  };
}

export function fetchList(id) {
  const request = axios.get(`/api/lists/${id}`);
  console.log('REQUEST:', request);
  return {
    type: FETCH_LIST,
    payload: request
  };
}

export function deleteList(id) {
  const request = axios.delete(`/api/lists/${id}`);
  console.log('REQUEST:', request);
  return {
    type: DELETE_LIST,
    payload: request
  };
}

// export function selectList(list) {
//   return {
//     type: 'LIST_SELECTED',
//     payload: list
//   };
// }

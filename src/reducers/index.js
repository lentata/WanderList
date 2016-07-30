import React from 'react';
import { combineReducers } from 'redux';
import ListsReducer from './reducer_lists';
import ActiveList from './reducer_active_list';

const rootReducer = combineReducers({
  lists: ListsReducer,
  activeList: ActiveList
});

export default rootReducer;
import { combineReducers } from 'redux';
import ListsReducer from './reducer_lists';

const rootReducer = combineReducers({
  lists: ListsReducer
});

export default rootReducer;
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ListsReducer from './reducer_lists';
import ActiveList from './reducer_active_list';

const rootReducer = combineReducers({
  lists: ListsReducer,
  activeList: ActiveList,
  routing: routerReducer
});

export default rootReducer;

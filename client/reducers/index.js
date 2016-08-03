import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import ListsReducer from './reducer_lists';
import ActiveList from './reducer_active_list';

const rootReducer = combineReducers({
  lists: ListsReducer,
  activeList: ActiveList,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;

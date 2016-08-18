import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import ListsReducer from './reducer_lists';
import AuthReducer from './reducer_auth';
import ItemsReducer from './reducer_items';

const rootReducer = combineReducers({
  lists: ListsReducer,
  form: formReducer,
  routing: routerReducer,
  auth: AuthReducer,
  itemsNo: ItemsReducer
});

export default rootReducer;

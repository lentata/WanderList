import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import ListsReducer from './reducer_lists';
import ActiveList from './reducer_active_list';
import AuthReducer from './reducer_auth';
import Votes from './reducer_votes';
// import validate from './validate_new_form';

const rootReducer = combineReducers({
  lists: ListsReducer,
  activeList: ActiveList,
  votes: Votes,
  form: formReducer,
  routing: routerReducer,
  auth: AuthReducer
});

export default rootReducer;

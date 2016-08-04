import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import ListsReducer from './reducer_lists';
import ActiveList from './reducer_active_list';
<<<<<<< 422a7acbe097c2ac5bc7d2de1ffdde14503bdf4f
import AuthReducer from './reducer_auth';
=======
import LoginReducer from './reducer_login';
>>>>>>> rebase merge

const rootReducer = combineReducers({
  lists: ListsReducer,
  activeList: ActiveList,
  form: formReducer,
<<<<<<< 422a7acbe097c2ac5bc7d2de1ffdde14503bdf4f
  routing: routerReducer,
  auth: AuthReducer
=======
  login: LoginReducer,
  routing: routerReducer
>>>>>>> rebase merge
});

export default rootReducer;

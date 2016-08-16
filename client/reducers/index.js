import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import ListsReducer from './reducer_lists';
import AuthReducer from './reducer_auth';
import UpvoteReducer from './reducer_upvote';
// import Comments from './reducer_comments'

const rootReducer = combineReducers({
  lists: ListsReducer,
  form: formReducer,
  // comments: Comments,
  routing: routerReducer,
  auth: AuthReducer,
  upvoter: UpvoteReducer 
});

export default rootReducer;

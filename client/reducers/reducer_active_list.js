//MARKED FOR DELETION
export default function(state = null, action) {
  if(action.type === 'LIST_SELECTED') {
    return action.payload;
  } else {
    return state;
  }
}

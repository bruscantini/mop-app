import { combineReducers } from 'redux';

/*
* action types
*/
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';

/*
* action creators
*/
export function setAuthentication(signedIn) {
  return { type: SET_AUTHENTICATION, signedIn };
}

/*
* reducers
*/
function isSignedIn(state = false, action) {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return action.signedIn !== 'undefined' ? action.signedIn : state;
    default:
      return state;
  }
}

export default combineReducers({
  isSignedIn
});

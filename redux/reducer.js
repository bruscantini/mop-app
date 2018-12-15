import { combineReducers } from 'redux';

/*
* action types
*/
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_ADDRESS = 'SET_ADDRESS';

/*
* action creators
*/
export function setAuthentication(signedIn, userId) {
  return { type: SET_AUTHENTICATION, signedIn, userId };
}
export function setAddress(name, description) {
  return { type: SET_ADDRESS, name, description };
}

/*
* reducers
*/
function authentication(state = { isSignedIn: false, userId: null }, action) {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return action.signedIn !== 'undefined' ?
        { isSignedIn: action.signedIn, userId: action.userId } : state;
    default:
      return state;
  }
}
function address(state = { name: '', description: '' }, action) {
  switch (action.type) {
    case SET_ADDRESS:
      return action.description ? { name: action.name, description: action.description } : state;
    default:
      return state;
  }
}

export default combineReducers({
  authentication,
  address
});

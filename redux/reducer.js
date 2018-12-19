import { combineReducers } from 'redux';

/*
* action types
*/
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_ADDRESS = 'SET_ADDRESS';

/*
* action creators
*/
export function setAuthentication(signedIn, user) {
  return { type: SET_AUTHENTICATION, signedIn, user };
}
export function setAddress(name, description) {
  return { type: SET_ADDRESS, name, description };
}

/*
* reducers
*/
function authentication(state = { isSignedIn: false, user: {} }, action) {
  const { signedIn, type, user = state.user } = action;
  switch (type) {
    case SET_AUTHENTICATION:
      return signedIn !== 'undefined' ?
        { isSignedIn: signedIn, user } : state;
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

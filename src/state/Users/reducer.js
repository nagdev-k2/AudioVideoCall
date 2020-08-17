import {isEqual} from 'lodash';

import {LOGIN, LOGOUT, UPDATE_PROFILE} from '../types';

const initialState = {
  currentUser: {},
  isAdmin: false,
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.data,
        isAdmin: isEqual(action.data.mobile, '7566881369'),
      };
    case UPDATE_PROFILE:
      console.log('in update profile');
      console.log(state);
      console.log(action);
      return {
        ...state,
        currentUser: {...state.currentUser, ...action.data},
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default UsersReducer;

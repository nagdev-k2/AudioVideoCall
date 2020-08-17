import {LOGIN, LOGOUT, UPDATE_PROFILE} from '../types';

export const loginDetails = (data) => ({
  type: LOGIN,
  data,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateProfile = (data) => ({
  type: UPDATE_PROFILE,
  data,
});

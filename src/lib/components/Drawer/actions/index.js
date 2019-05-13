import types, { _global } from 'src/actionTypes';
import { push } from 'react-router-redux';
import { InstabugService } from 'src/lib/components/Instabug';
import { AuthService } from 'src/lib/services/firebase/AuthService';

export const setDrawerState = (payload) => (dispatch) => {
  dispatch({ type: types.SET_DRAWER_STATE, payload });
  return Promise.resolve();
};

const goToLogin = () => (dispatch) => {
  dispatch(push('/login'));
  return Promise.resolve();
};

const resetUserData = () => (dispatch) => {
  dispatch({ type: _global.RESET_USER_DATA });
  return Promise.resolve();
};

export const handleSignOutButtonPress = () => (dispatch) => {
  return dispatch(setDrawerState(false))
  .then(() => AuthService.signOut())
  .then(() => dispatch(goToLogin()))
  .then(() => dispatch(resetUserData()));
};

export const handleReportBug = () => (dispatch, getState) => {
  setTimeout(() => InstabugService.invoke(getState), 400);
};

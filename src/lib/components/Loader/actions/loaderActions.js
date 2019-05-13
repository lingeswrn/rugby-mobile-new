import * as types from './types';

export const onLoadingStart = (id) => (dispatch) => {
  dispatch({ id, type: types.START, payload: true });
  return Promise.resolve();
};

export const onLoadingComplete = (id) => (dispatch) => {
  dispatch({ id, type: types.COMPLETE, payload: false });
  return Promise.resolve();
};

export const resetLoader = (id) => (dispatch) => {
  dispatch({ id, type: types.RESET });
  return Promise.resolve();
};

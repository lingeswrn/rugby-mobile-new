import types from 'src/actionTypes';

export const setEditingStatus = (status) => (dispatch) => {
  dispatch({ type: types.SET_SETTINGS_EDITING_STATUS, payload: status });
  return Promise.resolve();
};

import types, { offline } from 'src/actionTypes';

export const updateConnectingStatus = (status, count) =>
  (dispatch, getState) => {
    let { delay } = getState().connection;
    /* reset the timer when necessary. */
    if (status) {
      if (!delay || !count || count === 1) delay = 2;
      else delay = delay * 2;
    }
    dispatch({
      type: types.SET_SOCKET_CONNECTING,
      payload: { connecting: status, delay }
    });
    return Promise.resolve();
  };

export const updateConnectionStatus = (status) => (dispatch) => {
  dispatch({
    type: offline.CONNECTION_CHANGE,
    payload: status,
    local: { source: 'server' }
  });
  return Promise.resolve();
};

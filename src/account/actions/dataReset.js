import types from 'src/actionTypes';
import _ from 'lodash';
import { config } from 'src/config';
import { ConnectedSocket } from 'rbv-core/services/SocketService';

const checkDataVersion = () => (d, getState) => {
  const { resetOnUpdate, dataVersion } = getState().app;
  return Promise.resolve({
    shouldReset: (resetOnUpdate && (dataVersion !== config.dataVersion))
  });
};

const resetUserData = () => (dispatch, getState) => {
  return ConnectedSocket(dispatch, getState, {
    queue: true
  }).handleEvent('account:reset', getState().user.data._id)
  .then(({ memberOf, ...rest }) => {
    dispatch({
      type: types.RESET_DATA_VERSION_CHANGE,
      payload: {
        data: { ...rest },
        organizations: {
          all: memberOf, active: _.isEmpty(memberOf) ? {} : memberOf[0]
        },
        isNewAccount: true
      }
    });
    return Promise.resolve();
  })
  .catch((err) => {
    if (err === 'disconnected') return Promise.resolve();
    console.error(err);
    return Promise.reject(err);
  });
};

// TODO: eventually, this should go on the user model, so it's not dependent on
// local AsyncStorage.
export const updateAppDataVersion = (passThru) => (dispatch) => {
  console.log('updating app data version: ', config.dataVersion);
  dispatch({
    type: types.UPDATE_APP_DATA_VERSION, payload: config.dataVersion
  });
  return Promise.resolve(passThru);
};

export const possiblyResetUserData = () => (dispatch) => {
  return dispatch(checkDataVersion())
  .then(({ shouldReset }) => {
    console.log({ shouldReset });
    if (shouldReset) {
      return dispatch(resetUserData())
      .then(() => dispatch(updateAppDataVersion()));
    } return Promise.resolve();
  });
};

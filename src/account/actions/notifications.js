import types from 'src/actionTypes';
import { ConnectedSocket } from 'rbv-core/services/SocketService';
import { AuthService } from 'src/lib/services/firebase/AuthService';

export const checkPermissions = () => dispatch => {
  return AuthService.requestPermissions()
  .then(() => Promise.resolve())
  .catch(() => Promise.resolve());
};

export const registerDevice = () => (dispatch, getState) => {
  const user = getState().user.data._id;
  return AuthService.getInstance()
  .then(async token => {
    const { results } = await ConnectedSocket(dispatch, getState).search('devices', { token });
    return { device: results[0], token };
  })
  .then(({ device, token }) => {
    if (!device) {
      return ConnectedSocket(dispatch, getState).create(
        'devices', { user, token }
      );
    }
    return ConnectedSocket(dispatch, getState).update(
      'devices', device._id, { token, user }
    );
  })
  .catch(err => {
    console.log('error @ registerDevice', err);
    return Promise.resolve();
  });
};

export const getBadgeNumber = () => () => {
  return AuthService.getBadgeNumber()
  .then(resp => console.log(resp))
  .catch(err => console.log(err));
};

export const setBadgeNumber = () => () => {
  return AuthService.setBadgeNumber(0);
};

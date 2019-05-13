import types from 'src/actionTypes';
import { ConnectedSocket } from 'rbv-core/services/SocketService';
import { AuthService } from 'src/lib/services/firebase/AuthService';
import { push } from 'react-router-redux';
import _ from 'lodash';
import { getStripeAccounts } from 'src/Subscription/actions';
// import { possiblyResetUserData } from './dataReset';

export const authenticateUser = (formData) => (dispatch) => {
  return AuthService.authenticateUser(formData).then((user = {}) => {
    dispatch({ type: types.USER_AUTH_ATTEMPT, payload: user._user });
    return Promise.resolve(user);
  });
};

export const resetPassword = ({ email }) => () => {
  return AuthService.sendPasswordResetEmail(email)
  .then(() => Promise.resolve(email));
};

export const updateAuthStatus = (status) => (dispatch, getState) => {
  const { user } = getState();
  let hasUser = status;
  if (_.isUndefined(status)) {
    hasUser = !_.isEmpty(user.account) && !_.isEmpty(user.data);
  }
  dispatch({ type: types.SET_AUTH_STATUS, payload: hasUser });
  return Promise.resolve(user);
};

function updateAuthSequenceStatus(status) {
  return (dispatch) => {
    dispatch({ type: types.USER_IS_AUTHENTICATING, payload: status });
    return Promise.resolve(status);
  };
}

export const setUserData = data => (dispatch) => {
  if (_.isEmpty(data)) return Promise.reject({ message: 'Err @ setUserData' });
  const { memberOf, ...rest } = data;
  dispatch({ type: types.GET_USER_CUSTOM_DATA,
    payload: { data: rest, organizations: {
      all: memberOf, active: _.isEmpty(memberOf) ? {} : memberOf[0]
    }}
  });
  return Promise.resolve();
};

export const getUserData = (email) => (dispatch, getState) => {
  return ConnectedSocket(dispatch, getState, {
    offlinePayload: { fromState: ({ user }) => user.data }
  }).findOne('users', { email }, {
    populate: [
      { path: 'athleteProfile', populate: ['strengthTest', 'fitnessTest']},
      'appConfig', 'metadata', 'memberOf', 'squad'
    ]
  })
  .then((data) => dispatch(setUserData(data)))
  .then(() => dispatch(getStripeAccounts()))
  .catch((err) => {
    if (err === 'disconnected') return Promise.resolve();
    console.error(err);
    return Promise.reject(err);
  });
};

export const signIn = (credentials) => (dispatch, getState) => {
  return dispatch(updateAuthSequenceStatus(true))
  .then(() => dispatch(authenticateUser(credentials)))
  .then(() => dispatch(getUserData(credentials.username)))
  .then(() => dispatch(updateAuthStatus()))
  .then(() => dispatch(updateAuthSequenceStatus(false)))
  .then(() => {
    const { isNewAccount } = getState().user;
    const pathname = isNewAccount ? '/onboarding' : '/';
    dispatch(push(pathname));
  })
  .catch((err) => {
    return dispatch(updateAuthStatus(false))
    .then(() => Promise.reject(err));
  });
};

const checkUser = () => (dispatch) => {
  return AuthService.getUserAsync().then((user) => {
    const hasUser = !_.isNull(user);
    if (hasUser) {
      dispatch({
        type: types.REFRESH_USER,
        payload: { account: user._user, isAuthenticated: hasUser }
      });
      return Promise.resolve(user);
    } return Promise.reject();
  });
};

const checkData = () => (dispatch, getState) => {
  const { user = {}} = getState();
  const { data, account } = user;
  if (_.isEmpty(account)) return Promise.resolve();
  if (_.isEmpty(data)) {
    return dispatch(getUserData(account.email));
  } return Promise.resolve();
};

export const checkAuthStatus = () => (dispatch) => {
  return dispatch(updateAuthSequenceStatus(true))
  .then(() => dispatch(checkUser()))
  .then((user) => dispatch(checkData(user)))
  .then(() => dispatch(updateAuthSequenceStatus(false)))
  // TODO: actually handle errors here, MATT
  .catch(() => dispatch(updateAuthSequenceStatus(false)));
};

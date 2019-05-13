import types from 'src/actionTypes';
import _ from 'lodash';
import { AuthService } from 'src/lib/services';
import { ConnectedUserService, UserService } from 'rbv-core/services/Rugbyvault';
import { ConnectedSocket } from 'rbv-core/services/SocketService';
import { push } from 'react-router-redux';
import { updateAppDataVersion } from './dataReset';
import { setUserData, getUserData } from './signin';

export const getInvitation = ({ email }) => (dispatch, getState) => {
  return ConnectedSocket(dispatch, getState).findOne(
    'user-invitations', { email }, { populate: ['organization']}
  )
  .then((invitation) => {
    console.log(invitation);
    return _.isEmpty(invitation) ? null : Promise.resolve(invitation);
  });
};

// CREATE ACCOUNT FCNS _________________________________________________________
const _createAccount = formData => dispatch =>{
  return UserService.create(
    { ...formData, email: formData.email.toLowerCase() }
  )
  .then((payload) => {
    dispatch({
      type: types.CREATE_ACCOUNT,
      payload: {
        ...payload,
        isNewAccount: true,
        isAuthenticated: true
      }
    });
    return Promise.resolve(payload);
  });
};
const completeInvitation = (invitation) => (dispatch, getState) => {
  return ConnectedSocket(dispatch, getState).update('user-invitations', invitation._id, {
    ...invitation,
    response: 'accepted',
    status: 'complete'
  })
  .then(() => Promise.resolve());
};
const createAccountWithInvitation = ({ formData, invitation }) => (
  dispatch
) => {
  const { password } = formData;
  const { email, organization } = invitation;
  return dispatch(_createAccount(
    { email, password, memberOf: [organization]}
  ))
  .then(() => dispatch(completeInvitation(invitation)) )
  .then(() => dispatch(getUserData(email)))
  .catch(error => {
    dispatch({ type: types.SET_AUTH_STATUS, payload: false });
    return Promise.reject(error);
  });
};
export const createAccount = formData => dispatch =>{
  return dispatch(getInvitation(formData))
  .then(invitation => invitation
    ? ( invitation.organization.atCapacity
      ? dispatch(_createAccount(formData))
      : dispatch(createAccountWithInvitation({ formData, invitation }))
    )
    : dispatch(_createAccount(formData))
  );
};
// CREATE ACCOUNT FCNS _________________________________________________________

export const updateApiUser = (update) => (dispatch, getState) =>
  ConnectedUserService(dispatch, getState)
  .updateApiUser(update, getState().user.data._id)
  .then((payload) => {
    dispatch({ type: types.GET_USER_CUSTOM_DATA, payload });
    Promise.resolve(payload);
  });

export const updateAthleteProfile = (update) => (dispatch, getState) =>
  ConnectedUserService(dispatch, getState)
  .updateAthleteProfile(update, getState().user.data.atheleteProfile._id)
  .then((payload) => {
    dispatch({
      type: types.MODIFY_ATHLETE_PROFILE,
      payload
    });
    return Promise.resolve(payload);
  })
  .then((payload) => updateAppDataVersion(payload))
  .catch((err) => {
    if (err === 'disconnected') return Promise.resolve();
    return Promise.reject(err);
  });

export const updateUserAccount = (update) => (dispatch, getState) => {
  /* show an error toast in offline mode */
  if (!getState().connection.connected) {
    return Promise.reject({
      message: 'cannot update user profile in offline mode'
    });
  }

  return AuthService.updateProfile(update)
  .then(() => {
    dispatch({ type: types.MODIFY_USER_ACCOUNT, payload: update });
    return Promise.resolve(update);
  });
};

export const updateConfig = (update) => (dispatch, getState) =>
  ConnectedUserService(dispatch, getState)
  .updateConfig(update, getState().user.data._id)
  .then((payload) => {
    dispatch({ type: types.MODIFY_APP_CONFIG, payload });
    return Promise.resolve(payload);
  });


const setOnboardingStage = (onboardingStage) => (dispatch) => {
  dispatch({
    type: types.SET_ONBOARDING_STAGE,
    payload: { onboardingStage, isNewAccount: (onboardingStage === 'profile') }
  });
  return Promise.resolve();
};

export const handleOnboardingData = (formData) => (dispatch, getState) => {
  const CUS = ConnectedUserService(dispatch, getState);
  const { data } = getState().user;
  const userId = data._id;
  const profileId = data.athleteProfile._id;
  const configId = data.appConfig._id;
  const { firstname, lastname, units, ...rest } = formData;
  return CUS.updateAthleteProfile(rest, profileId)
  .then(() => CUS.updateConfig({ units }, configId))
  .then(() => CUS.updateApiUser(
    { name: { first: firstname, last: lastname }}, userId))
  .then((updated) => {
    /* make a dummy payload to handle all three updates when offline
     * NOTE: Onboarding shouldn't run in offline mode, so this is precautionary
     */
    if (!getState().connection.connected) {
      const pseudoPayload = _.merge(getState().user.data, {
        name: { first: firstname, last: lastname },
        appConfig: { units },
        athleteProfile: rest
      });
      dispatch(setUserData(pseudoPayload));
    } else dispatch(setUserData(updated));
  })
  .catch((err) => {
    if (err === 'disconnected') return Promise.resolve();
    return Promise.reject(err);
  });
};

export const handleCompleteOnboarding = () => (dispatch) => {
  return dispatch(setOnboardingStage('strength-test'))
  .then(() => dispatch(
    push({
      pathname: '/strength-test/introduction',
      state: { disableGoBack: true }
    })
  ));
};

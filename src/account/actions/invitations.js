import types from 'src/actionTypes';
import { SocketService } from 'rbv-core/services/SocketService/SocketService';
import _ from 'lodash';

export const getInvitations = () => (dispatch, getState) => {
  const { email } = getState().user.data;
  return SocketService.list('user-invitations', {
    query: { email }, populate: ['organization']
  })
  .then((results) => {
    dispatch({  type: types.GET_INVITATIONS, payload: results });
    return Promise.resolve(results);
  });
};

export const handleInvitation = (_id, response) => (dispatch, getState) => {
  const { invitations } = getState().user.organizations;
  const invitation = _.find(invitations, { _id });
  if (invitation.organization.atCapacity) {
    return Promise.reject({ message: 'This organization is at full capacity.' });
  }
  return SocketService.update('user-invitations', _id, {
    ...invitation, response, status: 'complete'
  })
  .then((newInvite) => {
    const withoutNew = _.reject(invitations, { _id });
    dispatch({
      type: types.GET_INVITATIONS, payload: [newInvite, ...withoutNew]
    });
    return Promise.resolve();
  });
};

import types from 'src/actionTypes';

import _ from 'lodash';
import { push } from 'react-router-redux';
import { SocketService } from 'rbv-core/services/SocketService/SocketService';

export const getMatches = () => (dispatch, getState) => {
  const user = getState().user.data._id;
  const squad = getState().user.data.squad;
  const squadId = squad ? squad._id : null;
  return SocketService.search('matches', {
    query: {
      $or: [ { user }, { squad: squadId } ]
    }
  })
  .then(({ results }) => {
    // add `type` prop to each result, either 'user' or 'organization';
    const payload = _.map(results, (result) => result.user
      ? { ...result, type: 'user' }
      : { ...result, type: 'organization' });
    dispatch({ type: types.GET_MATCHES, payload });
  });
};

export const setEditingMatch = (payload = null) => (dispatch) => {
  dispatch({ type: types.SET_EDITING_MATCH, payload });
  return Promise.resolve();
};

export const createMatch = (data) => (dispatch, getState) => {
  const user = getState().user.data._id;
  return SocketService.create('matches', { ...data, user })
  .then(() => dispatch(getMatches()))
  .then(() => {
    dispatch(setEditingMatch());
    dispatch(push('/matches'));
    return Promise.resolve();
  })
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
};

export const removeMatch = (id) => (dispatch) => {
  return SocketService.remove('matches', id)
  .then(() => dispatch(getMatches()))
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
};

export const updateMatch = (body) => (dispatch, getState) => {
  const { _id } = getState().matches.editing;
  SocketService.update('matches', _id, body)
  .then(() => dispatch(getMatches()))
  .then(() => dispatch(push('/matches')))
  .then(() => Promise.resolve())
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
};

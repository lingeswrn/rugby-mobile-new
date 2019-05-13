import types from 'src/actionTypes';

import _ from 'lodash';
import { push } from 'react-router-redux';
import { SocketService } from 'rbv-core/services/SocketService/SocketService';

export const getInjuries = () => (dispatch, getState) => {
  const user = getState().user.data._id;
  return SocketService.list('injuries', { query: { user }})
  .then((results) => {
    dispatch({  type: types.GET_INJURIES, payload: results });
    return Promise.resolve(results);
  });
};

const setEditingInjury = ({ bodyPart, muscleGroup, ...rest }) => (dispatch) => {
  dispatch({ type: types.SET_EDITING_INJURY, payload: { ...rest,
    bodyPart: _.isObject(bodyPart) ? bodyPart._id : muscleGroup,
    muscleGroup: _.isObject(muscleGroup) ? muscleGroup._id : muscleGroup
  }});
  return Promise.resolve();
};
export const editInjury = (match) => (dispatch) =>
  dispatch(setEditingInjury(match)).then(() => dispatch(push('/injuries/create')));

export const clearEditingInjury = () => dispatch => {
  dispatch({ type: types.SET_EDITING_INJURY, payload: {}});
  return Promise.resolve();
};

export const createInjury = (data) => (dispatch, getState) =>{
  const organization = getState().user.organizations.active._id;
  const user = getState().user.data._id;
  return SocketService.create('injuries', { ...data, user, organization })
  .then(() => dispatch(getInjuries()))
  .then(() => dispatch(setEditingInjury({})))
  .then(() => dispatch(push('/injuries')))
  .then(() => Promise.resolve());
};

export const removeInjury = (id) => (dispatch) =>
  SocketService.remove('injuries', id)
  .then(() => dispatch(getInjuries()))
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });

export const updateInjury = ({ _id, ...rest }) => (dispatch) =>
  SocketService.update('injuries', _id, rest)
  .then(() => dispatch(getInjuries()))
  .then(() => dispatch(push('/injuries')))
  .then(() => Promise.resolve())
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });

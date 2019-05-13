import types from 'src/actionTypes';
import _ from 'lodash';
import { FitnessTestService } from 'rbv-core/services/Rugbyvault';

const setPrevBeepTest = (payload = {}) => (dispatch) => {
  return dispatch({ type: types.GET_PREV_BEEP_TEST, payload });
};

export const getBeepTests = () => (dispatch, getState) => {
  const { _id } = getState().user.data;
  return FitnessTestService.getPastBeepTests(_id)
  .then((_payload) => {
    const payload = _.sortBy(_payload, ['completedAt']);
    dispatch({ type: types.GET_BEEP_TESTS, payload });
    dispatch(setPrevBeepTest(_.last(payload)));
    return Promise.resolve(payload);
  });
};

export const getPrevBeepTest = () => (dispatch, getState) => {
  const { fitnessTest } = getState().user.data.athleteProfile;
  if (!fitnessTest) {
    return dispatch(setPrevBeepTest());
  }
  return FitnessTestService.getBeepTest(fitnessTest)
  .then(payload => dispatch(setPrevBeepTest(payload)));
};

export const updateCurrentBeepTest = (update) => async(dispatch, getState) => {
  await dispatch({
    type: types.SET_CURRENT_BEEP_TEST,
    payload: update
  });
  const { current } = getState().fitnessTest;
  return Promise.resolve(current);
};

export const saveBeepTest = update => (dispatch, getState) => {
  const user = getState().user.data._id;
  return FitnessTestService.createAndSave({ ...update, user })
  .then(async(fitnessTest) => {
    await dispatch({ type: types.RESET_CURRENT_BEEP_TEST });
    await dispatch(
      { type: types.MODIFY_ATHLETE_PROFILE, payload: { fitnessTest }}
    );
    return Promise.resolve();
  });
};

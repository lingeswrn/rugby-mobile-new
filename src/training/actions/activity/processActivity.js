import types from 'src/actionTypes';
import { TrainingUtils } from 'rbv-core/services/Rugbyvault/Training';
import { SocketService } from 'rbv-core/services/SocketService';
import { push } from 'react-router-redux';
import { setCurrentSet } from './activity';

export function setActivityIndex(activityIndex) {
  return (dispatch, getState) => {
    // bump if index is defined
    // else push to workout summary.
    if (activityIndex !== undefined) {
      const { all } = getState().training.queue;
      dispatch({
        type: types.SET_CURRENT_ACTIVITY_INDEX,
        payload: {
          currentIndex: activityIndex,
          current: all[activityIndex],
        }
      });
      return dispatch(setCurrentSet(all[activityIndex]));
    }
    return dispatch(push('/workouts/summary'));
  };
}

export const processActivity = (activity) => (dispatch) => {
  return TrainingUtils.processActivity(activity)
  .then((payload) => {
    dispatch({ type: types.ADD_PROCESSED_ACTIVITY, payload });
    return Promise.resolve(payload);
  });
};

export function _process(activity, nextIndex) {
  return (dispatch) => dispatch(processActivity(activity))
  .then((processed) => dispatch(setActivityIndex(nextIndex, processed)));
}

export const process = (activity, nextIndex) => (dispatch, getState) => {
  const user = getState().user.data;
  return dispatch(processActivity(activity))
  .then(processedActivity => {
    return SocketService.create('activities', { ...processedActivity, ...processedActivity.stats, ...processedActivity.model, user });
  })
  .then(() => dispatch(setActivityIndex(nextIndex)));
};

export const onCompleteWorkout = () => (dispatch) => {
  dispatch({ type: 'RESET_ACTIVITY_QUEUE', payload: {}});
  return Promise.resolve();
};

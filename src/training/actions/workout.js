import _ from 'lodash';
import types from 'src/actionTypes';
import { push } from 'react-router-redux';
import { SocketService } from 'rbv-core/services/SocketService';

const goToWorkout = (type) => (dispatch) => {
  dispatch(push(`/workouts/${type}`));
  return Promise.resolve();
};
const setWorkoutSegment = (payload) => (dispatch) => {
  dispatch({ type: types.SELECT_WORKOUT_SEGMENT, payload });
  return Promise.resolve();
};
function updateRecentWorkouts(thisWeek, workout) {
  const index = _.findIndex(thisWeek, { workoutType: workout.workoutType });
  thisWeek[index] = workout;
  return thisWeek;
}

export const selectWorkoutSegment = (type) => (dispatch) => {
  return dispatch(setWorkoutSegment(type))
  .then(() => dispatch(goToWorkout(type)));
};

export const updateWorkout = (id, update) => (dispatch, getState) => {
  return SocketService.update('workouts', id, update)
  .then((current) => {
    const thisWeek = updateRecentWorkouts(
      getState().training.workout.thisWeek, current
    );
    dispatch({
      type: types.UPDATE_CURRENT_WORKOUT,
      payload: { current, thisWeek }
    });
    return Promise.resolve(current);
  });
};

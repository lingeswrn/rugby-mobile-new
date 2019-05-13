import _ from 'lodash';
import types from 'src/actionTypes';
import { WorkoutService } from 'rbv-core/services/Rugbyvault/Training/WorkoutService';

const Workout = (getState) => {
  const { injuries, training, user } = getState();
  const { trainingPlan: { current }, weeklyRoutine } = training;
  return new WorkoutService(current, weeklyRoutine, user, injuries);
};

const getCurrentWorkouts = (id) => (dispatch, getState) => {
  const thisWeek = _.uniqBy(_.filter(getState().training.workout.all,
    ({ weeklyRoutine }) => weeklyRoutine === id), 'workoutType');
  dispatch({  type: types.SET_LATEST_WORKOUTS, payload: thisWeek, });
  return Promise.resolve(thisWeek);
};

function setCurrentWorkout(workouts, query, config) {
  const isNew = _.isUndefined(_.find(workouts, query));
  return (dispatch, getState) => {
    return Workout(getState).setCurrentWorkout(workouts, query, config)
    .then((payload) => {
      dispatch({
        type: isNew ? types.CREATE_WORKOUT : types.SET_CURRENT_WORKOUT, payload
      });
      return Promise.resolve(payload);
    });
  };
}

function setCurrentWorkoutTemplate(workout, { workoutTemplates }) {
  return (dispatch, getState) => {
    return Workout(getState).getWorkoutTemplate(workoutTemplates, workout)
    .then((payload) => {
      dispatch({ type: types.SET_CURRENT_WORKOUT_TEMPLATE, payload });
      return Promise.resolve(payload);
    });
  };
}

export const setDay = () => (dispatch, getState) => {
  const { schedule } = Workout(getState);
  const payload = schedule.getCurrentDaySchedule();
  dispatch({ type: types.SET_DAY, payload });
  return Promise.resolve(payload);
};

export const setSelectedWorkoutType = (payload) => (dispatch) => {
  dispatch({ type: types.SET_SELECTED_ID, payload });
  return Promise.resolve();
};

export const buildWorkout = () => (dispatch, getState) => {
  const {
    workout: { selectedId }, weeklyRoutine: { current, template }
  } = getState().training;
  if (selectedId === 6) return Promise.resolve();
  return dispatch(getCurrentWorkouts(current._id))
  .then((workouts) => {
    const workoutTemplate = _.find(
      template.workoutTemplates, { workoutType: Number(selectedId) }
    );
    if (!workoutTemplate) return Promise.resolve();
    return dispatch(
      setCurrentWorkout(workouts, { workoutType: selectedId.toString() }, {
        workoutType: selectedId.toString(),
        workoutTemplate: workoutTemplate._id
      })
    );
  })
  .then((workout) => dispatch(
    setCurrentWorkoutTemplate(workout, template))
  )
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
};

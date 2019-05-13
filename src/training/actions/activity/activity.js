import types from 'src/actionTypes';
import _ from 'lodash';
import { updateWorkout } from '../workout';
import { SocketService } from 'rbv-core/services/SocketService';
import { TrainingUtils } from 'rbv-core/services/Rugbyvault/Training';

const createOrUpdateCardioActivity = activity => dispatch => {
  return (activity._id)
    ? SocketService.update('activities', activity._id, activity)
    : SocketService.create('activities', activity)
    .then(res => {
      const payload = { ...activity, ...res };
      dispatch({ type: types.MODIFY_CURRENT_ACTIVITY, payload });
      return Promise.resolve(payload);
    });
};
export const saveCardioActivity = update => dispatch => {
  return SocketService.update('activities', update._id, update)
  .then(res => {
    const payload = { ...update, ...res };
    dispatch({ type: types.MODIFY_CURRENT_ACTIVITY, payload });
    return Promise.resolve();
  });
};

export const handleCardioSelections = (activity, workout) => (
  dispatch, getState
) => {
  const { _id, workoutType } = workout;
  const { staticData, user } = getState();
  // --- returns ALL cardio activity data
  // --- {activityTemplate, cardioProfile, current: {model}}
  return TrainingUtils.prepCardioActivity(activity, staticData, user)
  .then((payload) => {
    dispatch({ type: types.SET_CARDIO_SELECTIONS, payload });
    return Promise.resolve(payload);
  })
  .then(async(payload) => {
    const { cardioProfile, current: { model }} = payload;
    // --- creates the workout activity and sets the doc in state
    const cardio = await dispatch(createOrUpdateCardioActivity(
      { ...model, workoutIndex: Number(workoutType) }
    ));
    // --- updates workout with the selected cardio profile and activity model
    await dispatch(updateWorkout(_id, {
      status: 'incomplete',
      cardioProfile,
      cardio
    }));
    return Promise.resolve(payload);
  });
};

export const setCurrentSet = ({ target }, setIndex = 0) => (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_SET,
    payload: {
      currentSet: {
        reps: target.reps[setIndex],
        weight: target.weight[setIndex],
        setIndex,
        setNumber: (setIndex + 1)
      },
    }
  });
  return Promise.resolve();
};

export const updateCurrentSet = (update) => (dispatch) => {
  dispatch({
    type: types.UPDATE_CURRENT_SET,
    payload: update
  });
  return Promise.resolve();
};

export const modifyActivity = (model, currentSet, type) => (dispatch) => {
  let update;
  if (type === 'cardio') {
    update = model;
  } else {
    const { weight, reps, setIndex } = currentSet;
    update = _.pick(model, ['reps', 'weightBySet']);

    update.reps[setIndex] = reps;
    update.weightBySet[setIndex] = weight;
  }

  dispatch({ type: types.MODIFY_CURRENT_ACTIVITY, payload: update });
  return Promise.resolve();
};

/* handles user override of activity */
export const swapActivity = (_id) => (dispatch, getState) => {
  const { user, training: { queue: { all }, activity }} = getState();
  const { current: { activityIndex }, currentSet: { setIndex }} = activity;
  const { strengthTest } = user.data.athleteProfile;
  return TrainingUtils.replaceTemplateInActivity(getState, _id)
  .then((replaced) =>
    TrainingUtils.prepActivity(replaced, activityIndex, strengthTest)
  ).then((newActivity) => {
    all[activityIndex] = newActivity;
    dispatch({ type: types.REPLACE_ACTIVITY_IN_WORKOUT, payload: newActivity });
    dispatch({ type: types.REPLACE_ACTIVITY_IN_QUEUE, payload: all });
    return Promise.resolve(newActivity);
  }).then((newActivity) => dispatch(setCurrentSet(newActivity, setIndex)));
};

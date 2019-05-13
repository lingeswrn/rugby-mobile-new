import _ from 'lodash';
import types from 'src/actionTypes';
import { TrainingPlan } from 'rbv-core/services/Rugbyvault/Training';
import { UserService } from 'rbv-core/services/Rugbyvault/UserService';

// returns a populated training plan
function getTrainingPlan(id) {
  return (dispatch) => {
    return TrainingPlan().getTrainingPlan(id)
    .then((payload) => {
      dispatch({
        type: types.GET_LATEST_TRAINING_PLAN,
        payload: payload
      });
      return Promise.resolve(payload);
    });
  };
}

function processTrainingPlan(plan) {
  return (dispatch, getState) => {
    const Plan = TrainingPlan(plan, getState().user);
    return Plan.processTrainingPlan()
    .then((processedPlan) => {
      dispatch({
        type: types.PROCESS_TRAINING_PLAN,
        payload: processedPlan
      });
      return Promise.resolve(processedPlan);
    });
  };
}

function createTrainingPlan() {
  return (dispatch, getState) => {
    const user = getState().user.data;
    return TrainingPlan().getUserDefaultTemplate(user.athleteProfile)
    .then((template) => {
      return TrainingPlan().create(template._id, user._id)
      .then((payload) => {
        dispatch({
          type: types.GET_LATEST_TRAINING_PLAN,
          payload
        });
        return Promise.resolve(payload);
      });
    });
  };
}

function updateActivePlanID(plan) {
  return (dispatch, getState) => {
    return UserService.updateAthleteProfile(
      { activeTrainingPlan: plan._id },
      getState().user.data.athleteProfile._id
    )
    .then((payload) => {
      dispatch({
        type: 'MODIFY_ATHLETE_PROFILE',
        payload
      });
      return Promise.resolve(plan);
    });
  };
}

const getOrCreateTrainingPlan = () => (dispatch, getState) => {
  const { activeTrainingPlan } = getState().user.data.athleteProfile;
  const { original } = getState().training.trainingPlan;
  if (!activeTrainingPlan) {
    return dispatch(createTrainingPlan())
    .then((plan) => dispatch(updateActivePlanID(plan)));
  } else if (
    _.isEmpty(original) ||
    activeTrainingPlan !== original._id
  ) {
    return dispatch(getTrainingPlan(activeTrainingPlan));
  }
  // TODO: reset this so it doesn't fetch every time
  return Promise.resolve(original);
};

export function buildTrainingPlan(trainingPlan) {
  if (!trainingPlan || _.isEmpty(trainingPlan)) {
    return (dispatch) => dispatch(getOrCreateTrainingPlan())
    .then((plan) => dispatch(processTrainingPlan(plan)));
  }
  return (dispatch) => dispatch(processTrainingPlan(trainingPlan));
}

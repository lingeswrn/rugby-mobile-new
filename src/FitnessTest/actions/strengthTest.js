import types from 'src/actionTypes';
import _ from 'lodash';
import moment from 'moment';

import {
  StrengthTestService,
  TrainingUtils
} from 'rbv-core/services/Rugbyvault';
import { SocketService } from 'rbv-core/services/SocketService';
export { getStaticData } from 'src/account/actions/staticData';

const getStrengthTest = (test) => (dispatch) => {
  if (_.isPlainObject(test)) return Promise.resolve(test);
  return SocketService.findById('strength-tests', test, { populate: '' })
  .then((strengthTest) => {
    dispatch({
      meta: { list: 'strength-test' },
      type: 'UPDATE_USER_DATA/EXTERNAL',
      payload: strengthTest,
    });
    return Promise.resolve(strengthTest);
  });
};

export const getPrevStrengthTest = () => (dispatch, getState) => {
  const { strengthTest } = getState().user.data.athleteProfile;
  const { staticData } = getState();
  return dispatch(getStrengthTest(strengthTest))
  .then((test) => {
    dispatch({
      type: types.GET_PREV_STRENGTH_TEST,
      payload: {
        ...test,
        activities:
          TrainingUtils.populateActivities(test.activities, staticData)
      }
    });
    return Promise.resolve();
  });
};

export const getCompletedStrengthTests = () => (dispatch, getState) => {
  const { _id } = getState().user.data;
  return StrengthTestService.getPastStrengthTests(_id)
  .then(payload => {
    dispatch({ type: types.GET_COMPLETED_STRENGTH_TESTS, payload });
    return Promise.resolve(payload);
  });
};

export const getCurrentStrengthTest = () => (dispatch, getState) => {
  return StrengthTestService.getOrCreate(getState().user.data._id)
  .then((payload) => {
    dispatch({ type: types.GET_CURRENT_STRENGTH_TEST, payload: payload });
    return Promise.resolve(payload);
  });
};

export function setDefaultActivities() {
  return (dispatch, getState) => {
    return StrengthTestService.constructStrengthTestActivities(getState)
    .then((activities) => {
      dispatch({
        type: types.GET_AVAILABLE_STRENGTH_TEST_ACTIVITIES,
        payload: activities
      });
      return Promise.resolve(activities);
    });
  };
}

export function modifyCurrentActivityModel(activity) {
  return (dispatch) => {
    dispatch({
      type: types.MODIFY_ACTIVE_STRENGTH_TEST_ACTIVITY_MODEL,
      payload: activity
    });
    return Promise.resolve(activity);
  };
}

export function completeActivity(activity, completed) {
  return (dispatch) => {
    return StrengthTestService.process(activity)
    .then((updatedActivity) => {
      const activityList = _.reject(completed, {
        muscleGroup: updatedActivity.muscleGroup
      });
      activityList.push(updatedActivity);
      dispatch({
        type: types.UPDATE_COMPLETED_STRENGTH_TEST_ACTIVITY,
        payload: activityList
      });
      return Promise.resolve(activityList);
    });
  };
}

export function processStrengthTestActivity(activity) {
  return (dispatch, getState) => {
    return StrengthTestService.process(activity)
    .then((payload) => {
      dispatch({
        type: types.ADD_COMPLETED_STRENGTH_TEST_ACTIVITY,
        payload
      });
      return Promise.resolve();
    })
    .then(() => {
      const {
        completedActivities,
        enqueuedActivities
      } = getState().strengthTest;
      const nextIndex = completedActivities.length;
      if (nextIndex < enqueuedActivities.length) {
        const nextActivity = enqueuedActivities[nextIndex].model;
        dispatch(modifyCurrentActivityModel(nextActivity));
      }
      return Promise.resolve(nextIndex);
    });
  };
}

export function navigateStrengthTestActivity(activityList) {
  return (dispatch) => {
    dispatch({
      type: types.GET_AVAILABLE_STRENGTH_TEST_ACTIVITIES,
      payload: activityList
    });
    return Promise.resolve(activityList);
  };
}

export function compileCompletedActivities() {
  return (dispatch, getState) => {
    return StrengthTestService.compileCompletedActivities(getState)
    .then((payload) => {
      dispatch({
        type: types.COMPILE_STRENGTH_TEST_ACTIVITIES,
        payload
      });
      return Promise.resolve(payload);
    });
  };
}

const updateStrengthTest = (body) => (dispatch) => {
  return SocketService.update('strength-tests', body._id, body)
  .then((payload) => {
    dispatch({
      type: types.SET_CURRENT_STRENGTH_TEST,
      payload
    });
    return Promise.resolve(payload);
  });
};


function updateUserStatus() {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER_STATUS_FLAG',
      payload: { isNewAccount: false, onboardingStage: 'complete' }
    });
    return Promise.resolve();
  };
}

export function setFirstTestFlag(payload) {
  return (dispatch) => {
    dispatch({
      type: types.SET_FIRST_TEST_FLAG,
      payload
    });
    return Promise.resolve();
  };
}

export const onLeaveCompletedStrengthTest = () => (dispatch, getState) => {
  const { current, completedActivities } = getState().strengthTest;
  return dispatch(updateStrengthTest({
    ...current,
    activities: completedActivities,
    completedAt: moment(),
    status: 'complete'
  }))
  .then(async strengthTest => {
    await dispatch({ type: 'CLEAR_STRENGTH_TEST_QUEUES' });
    await dispatch({ type: 'GET_PREV_STRENGTH_TEST', payload: strengthTest });
    await dispatch({ type: 'MODIFY_ATHLETE_PROFILE', payload: { strengthTest }});
    await dispatch(setFirstTestFlag(false));
    await dispatch(updateUserStatus());
  });
};

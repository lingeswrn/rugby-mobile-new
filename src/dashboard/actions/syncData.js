import { _global } from 'src/actionTypes';
import { push } from 'react-router-redux';
import { ConnectedSocket } from 'rbv-core/services/SocketService';
import {
  buildTrainingPlan,
  buildWeeklyRoutine,
  buildWorkout,
  setDay,
  setSelectedWorkoutType
} from 'src/training/actions';
import { DailyLog } from 'rbv-core/services/Rugbyvault/DailyLogService';
import { getMatches } from 'src/Matches/actions/matchesActions';
import _ from 'lodash';
import moment from 'moment';
import pluralize from 'pluralize';


const getKeystoneData = (passThru) => (dispatch, getState) => {
  return ConnectedSocket(dispatch, getState, {
    offlinePayload: {
      dependsOn: ({ app, dashboard }) => (
        !_.isUndefined(dashboard.lastSync) &&
        _.has(app, ['metadata', 'lists'])
      ),
      fromState: ({ app: { metadata }}) => ({
        _options: metadata.options,
        lists: metadata.lists,
        paths: metadata.paths
      })
    }
  }).handleEvent('keystone', { counts: false })
  .then((payload) => {
    if (payload) dispatch({ type: _global.KEYSTONE, payload });
    return Promise.resolve(passThru);
  });
};

export const syncData = (email) => (dispatch, getState) => {
  const DailyLogService = new DailyLog(dispatch, getState);
  return ConnectedSocket(dispatch, getState).execEvent('getAppData', email)
  .then((data) => {
    dispatch({
      type: _global.SYNC,
      payload: {
        ...data,
        staticData: _.mapKeys(data.staticData,
          (val, key) => _.camelCase(pluralize(key)))
      },
      meta: { timestamp: moment().format('YYYY-MM-DD') }
    });
    return Promise.resolve(data);
  })
  .then((data) => dispatch(getKeystoneData(data)))
  .then((data) => dispatch(buildTrainingPlan(_.find(data.trainingPlans,
    ['_id', data.user.athleteProfile.activeTrainingPlan]
  ))))
  .then(() => dispatch(buildWeeklyRoutine()))
  .then(() => dispatch(setDay()))
  .then(({ relativeIndex }) => dispatch(setSelectedWorkoutType(relativeIndex)))
  .then(() => dispatch(buildWorkout()))
  .then(() => DailyLogService.getOrCreateCurrentEntry())
  .then(() => dispatch(getMatches()))
  .catch((err) => {
    if (err !== 'disconnected') {
      dispatch({ type: _global.RESET_USER_DATA });
      dispatch(push({ pathname: '/signin', state: {
        message: 'An error occurred while updating account data; please log in again.'
      }}));
    }
    return Promise.resolve();
  });
};

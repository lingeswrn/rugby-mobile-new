import _ from 'lodash';

import moment from 'moment';
import { SocketService } from '../SocketService';
import { TrainingUtils } from './Training';

export class StrengthTest {
  constructor() {}

  getOrCreate(_id) {
    return SocketService.search('strength-tests', {
      query: { user: _id, status: 'incomplete' }
    }).then(({ results }) => {
      console.log('ST getOrCreate get results', results);
      if (results.length) return Promise.resolve(results[0]);
      return SocketService.create('strength-tests', {
        user: _id,
        startedAt: moment()
      });
    });
  }

  getPastStrengthTests(_id) {
    return SocketService.search('strength-tests', {
      query: { user: _id, status: 'complete' },
      populate: ['activities.activityTemplate', 'activities.muscleGroup']
    }).then(({ results }) => Promise.resolve(results));
  }

  getIncludedMuscleGroups(muscleGroups) {
    return Promise.resolve(
      _.filter(muscleGroups, { excludeFromStrengthTest: false })
    );
  }

  constructStrengthTestActivities(getState) {
    const state = getState();
    const lastTest = state.strengthTest.previous;
    // filter excluded muscle groups
    return this.getIncludedMuscleGroups(state.staticData.muscleGroups).then(
      (muscleGroups) => {
        // get activity data from previous test
        return Promise.resolve(
          muscleGroups.map((muscleGroup) => {
            const { _id } = muscleGroup;
            // get all available activity templates
            const activityTemplates = _.filter(
              state.staticData.activityTemplates,
              {
                primaryMuscleGroup: _id,
                activityType: 'weights',
                trainingType: 'lifting'
              }
            );

            // create a default model
            let model = {
              muscleGroup: muscleGroup._id,
              activityTemplate: activityTemplates[0]._id,
              reps: 1,
              weight: 0,
              oneRepMax: 0,
              status: 'incomplete'
            };

            // use data from previous test if it exists
            if (!_.isEmpty(lastTest)) {
              const previous = _.find(lastTest.activities, {
                muscleGroup: _id
              });
              // make sure there's a previous activity for the current muscleGroup
              if (!_.isEmpty(previous)) {
                const { activityTemplate, reps, weight, oneRepMax } = previous;
                model = {
                  ...model,
                  activityTemplate: activityTemplate._id,
                  reps,
                  weight,
                  oneRepMax
                };
              }
            }
            return { model, activityTemplates };
          })
        );
      }
    );
  }

  process(activity) {
    const { reps, weight } = activity;
    return TrainingUtils.getOneRepMax(weight, reps).then((oneRepMax) =>
      Promise.resolve({ ...activity, oneRepMax })
    );
  }

  compileCompletedActivities(getState) {
    const {
      staticData: { activityTemplates, muscleGroups },
      strengthTest: { previous: { activities }, completedActivities }
    } = getState();
    const prevActivities = _.map(activities, activ => ({
      ...activ, muscleGroup: _.isString(activ.muscleGroup)
        ? activ.muscleGroup
        : activ.muscleGroup._id
    }));
    return Promise.resolve(
      _.map(completedActivities, (activity) => {
        return {
          activityTemplate: _.find(activityTemplates, {
            _id: activity.activityTemplate
          }),
          current: activity,
          muscleGroup: _.find(muscleGroups, { _id: activity.muscleGroup }),
          previous: _.find(
            prevActivities,
            { muscleGroup: activity.muscleGroup }
          )
        };
      })
    );
  }
}

export const StrengthTestService = new StrengthTest();

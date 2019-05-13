/* eslint-disable no-unused-vars, no-dupe-keys */
import _ from 'lodash';
import moment from 'moment';
import preciseDiff from 'moment-precise-range-plugin';
import { SocketService } from '../../SocketService';
import { processTrainingPlan as _processTrainingPlan } from './utils';

const defaultPopulationConfig = {
  path: 'trainingPlanTemplate',
  populate: {
    path: 'weeklyRoutineTemplates',
    populate: [
      'workoutTemplates.recovery1',
      'workoutTemplates.recovery2',
      'workoutTemplates.training1',
      'workoutTemplates.training2',
      'workoutTemplates.taper1',
      'workoutTemplates.taper2'
    ]
  }
};

export class TrainingPlanService {
  constructor(plan) {
    if (plan) {
      this.plan = plan;
      this.planAge = moment.preciseDiff(this.plan.startDate, moment(), true);
      this.userId = plan.user;
    }
  }

  create(templateId, _id) {
    console.log('####### creating new training plan #######');
    return SocketService.create('training-plans', {
      trainingPlanTemplate: templateId,
      user: _id,
      setAsDefault: true
    }, { populate: defaultPopulationConfig })
    .then((data) => {
      return Promise.resolve(data);
    });
  }

  getTemplates(config) {
    return SocketService.search('training-plan-templates', config)
    .then(({ results }) => Promise.resolve(results));
  }

  getTrainingPlan(_id) {
    return SocketService.findById('training-plan', _id, {
      populate: defaultPopulationConfig
    })
    .then((data) => {
      if ( !data || _.isEmpty(data)) {
        console.log('no data @ getTrainingPlan; resp: ', data);
        return Promise.reject({
          type: 'no data on response',
          message: `we couldn't find a fitness plan with id ${ _id }`
        });
      }
      return Promise.resolve(data);
    });
  }

  getUserDefaultTemplate({ level }) {
    return this.getTemplates({
      query: { level, 'default': true }
    })
    .then((templates) => Promise.resolve(templates[0]));
  }

  getWeeklyRoutines() {
    return SocketService.list('weekly-routines', { query: { trainingPlan: this.plan._id }})
    .then(({ results }) => Promise.resolve(results));
  }

  processTrainingPlan(plan) {
    const PLAN = plan || this.plan;
    return Promise.resolve(_processTrainingPlan(PLAN));
  }
}

export const TrainingPlan = (plan) => {
  return new TrainingPlanService(plan);
};

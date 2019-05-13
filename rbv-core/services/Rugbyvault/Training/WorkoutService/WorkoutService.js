import _ from 'lodash';
import moment from 'moment';
import { WorkoutSchedule } from './Schedule';
import { SocketService } from '../../../SocketService';

const dayIndexMap = {
  0: 'recovery1',
  1: 'training1',
  2: 'training2',
  3: 'taper1',
  4: 'taper2',
  5: 'recovery2',
  6: 'gameday'
};

export class WorkoutService {
  constructor(plan, week, workout, user, injuries) {
    this.plan = plan;
    this.week = week;
    this.workout = workout;
    this.user = user;
    this.schedule = new WorkoutSchedule(week, user, injuries);
    this.today = this.schedule.getCurrentDaySchedule();
    this.injuryLimits = this.today.injuryLimits;
    /* this is absolute in terms of cal. week (where Monday = 0, Sunday = 6) */
    this.weekDayIndex = this.today.dayIndex;
    /* just a method of keeping workouts in order throughout plan */
    this.planDayIndex = moment.utc().diff(this.plan.startDate, 'days');
    this.dayOfPlan = this.planDayIndex + 1;
    this.workoutType = this.today.metadata.workoutType;
    this.workoutTypeName = this.today.metadata.workoutTypeName;
  }

  currentTemplate(workoutType) {
    const typeName = _.isUndefined(workoutType)
      ? this.workoutTypeName
      : dayIndexMap[_.toNumber(workoutType)];
    if(_.parseInt(workoutType) === 6) return {};
    return this.week.template.workoutTemplates[typeName];
  }

  createWorkout(config) {
    console.log('###### creating a new workout ######');
    const {
      weightliftingActivityTemplates = [],
      cardioActivityTemplates = [],
      _id
    } = this.currentTemplate(config.workoutType);
    const initialData = {
      trainingPlan: this.plan._id,
      user: this.user.data._id,
      weekNumber: this.week.current.weekOfPlan,
      weeklyRoutine: this.week.current._id,
      workoutTemplate: _id,
      workoutType: _.parseInt(this.workoutType),
      injuryLimits: this.injuryLimits,
      weightliftingStatus: _.isEmpty(weightliftingActivityTemplates) ? 'complete' : 'notStarted',
      cardioStatus: _.isEmpty(cardioActivityTemplates) ? 'complete' : 'notStarted',
      status: 'notStarted',
      ...config
    };
    return SocketService.create('workouts', initialData);
  }

  updateWorkout(update) {
    const { _id } = this.workout;
    console.log('###### updating workout ######');
    return SocketService.update('workouts', _id, update);
  }

  getWorkouts(weeklyRoutine) {
    return SocketService.search('workouts', {
      query: { weeklyRoutine },
      populate: '',
      sort: { workoutType: 1 }
    }).then((resp) => Promise.resolve(resp.results));
  }

  setCurrentWorkout(workouts: Array, query, config) {
    let { workoutType } = query;
    if (!workoutType) workoutType = this.workoutType.toString();
    if (workoutType === 6) return Promise.resolve({ workoutType: '6' });
    if (workouts.length) {
      const Workout = _.find(workouts, query);
      if (Workout) {
        return Promise.resolve(
          { ...Workout, injuryLimits: this.injuryLimits }
        );
      }
    }
    return this.createWorkout(config);
  }

  getWorkoutTemplate(templates, workout) {
    if (!workout || workout.workoutType === '6') return Promise.resolve({});
    const { workoutTemplate } = workout;
    let template = undefined;
    switch(typeof workoutTemplate) {
      case 'undefined':
        template = templates[dayIndexMap[_.parseInt(workout.workoutType)]];
        break;
      case 'object':
        template = _.find(templates, { _id: workoutTemplate._id });
        break;
      case 'string':
        template = _.find(templates, { _id: workoutTemplate });
        break;
      default:
        template = templates[dayIndexMap[_.parseInt(workout.workoutType)]];
        break;
    }
    return Promise.resolve(template);
  }
}

export const Workout = (plan, week, workout, user, injuries) =>
  new WorkoutService(plan, week, workout, user, injuries);

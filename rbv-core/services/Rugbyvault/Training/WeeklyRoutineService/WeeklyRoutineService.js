import _ from 'lodash';
import moment from 'moment';

import { SocketService } from '../../../SocketService';
import { TrainingPlan } from '../TrainingPlanService';

export class WeeklyRoutineService {
  constructor(plan) {
    this.plan = plan;
    this.planStart = moment(plan.startDate, 'YYYY-MM-DD');
    this.TrainingPlanService = TrainingPlan(plan);
  }

  // determines index of which weeklyRoutineTemple should be used.
  get currentCycleIndex() {
    const {
      totalWeeks, weeklyRoutineTemplates
    } = this.plan.trainingPlanTemplate;
    const totalCycles = totalWeeks / weeklyRoutineTemplates.length;
    const cycleLength = totalWeeks / totalCycles;
    const remainder = this.currentWeek % cycleLength;
    if (remainder) return remainder - 1;
    return cycleLength - 1;
  }

  get currentTemplateId() {
    return this.plan
    .trainingPlanTemplate.weeklyRoutineTemplates[this.currentCycleIndex]._id;
  }

  get currentWeekIndex() { return moment().diff(this.planStart, 'weeks'); }
  get currentWeek() { return this.currentWeekIndex + 1; }

  getWeekData() {
    return Promise.resolve({
      week: this.currentWeek,
      weekIndex: this.currentWeekIndex
    });
  }

  createWeeklyRoutine(user) {
    console.log('###creating new weekly routine###');
    const { gameday } = user.data.athleteProfile;
    let startDate = moment().isoWeekday(gameday).add(1, 'days');
    if (moment().isBefore(startDate)) {
      startDate = startDate.subtract(7, 'days');
    }
    return SocketService.create('weekly-routines', {
      startDate,
      trainingPlan: this.plan._id,
      user: user.data._id,
      weekOfYear: moment().isoWeekYear(),
      weekOfPlan: this.currentWeek,
      weeklyRoutineTemplate: this.currentTemplateId,
      year: moment().year()
    })
    .then((data) => Promise.resolve(data))
    .catch((err) => console.log(err));
  }

  processWeeklyRoutineTemplate(template) {
    let id = template;
    if (_.isObject(template)) id = template._id;
    return Promise.resolve(
      _.find(this.plan.trainingPlanTemplate.weeklyRoutineTemplates, { _id: id })
    );
  }

  getOrCreateCurrentWeeklyRoutine(routines, user) {
    const Routine = _.find(routines, (routine) => (
      routine.trainingPlan === this.plan._id &&
      routine.weekOfPlan === this.currentWeek
    ));
    // console.log('routine @ getCurrentWeeklyRoutine', { Routine });
    if (!Routine) return this.createWeeklyRoutine(user);
    return Promise.resolve(Routine);
  }
}

export const WeeklyRoutine = (plan) =>
  new WeeklyRoutineService(plan);

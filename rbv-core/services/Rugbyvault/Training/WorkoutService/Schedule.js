import _ from 'lodash';
import moment from 'moment';
import { InjuryService } from '../../InjuryService';
const dayIndexMap = {
  0: 'recovery1',
  1: 'training1',
  2: 'training2',
  3: 'taper1',
  4: 'taper2',
  5: 'recovery2',
  6: 'gameday'
};

export class WorkoutSchedule {
  constructor(week, user, injuries) {
    this.week = week;
    this.user = user;
    this.isAthlete = user.data.accountType === 'athlete';
    this.gameday = user.data.athleteProfile.gameday || 'Monday';
    this.currentDayNumber = moment().isoWeekday();
    this.injuries = new InjuryService(injuries);
  }

  get gameDate() {
    let date = moment().isoWeekday(this.gameday);
    /* if gameday has already occured this week, jump to next week. */
    if (date.isBefore(moment(), 'day')) date = date.add(1, 'week');
    return date;
  }

  /* day number of gameday */
  get gamedayNumber() { return this.gameDate.day(); }

  /* number of days to offset workouts from first day of week */
  get offset() { return 7 - this.gamedayNumber; }

  /* current distance in days from next occurance of gameday */
  get daysUntilGameday() {
    const daysUntil = this.gamedayNumber - this.currentDayNumber;
    return  daysUntil >= 0 ? daysUntil : 7 + daysUntil;
  }

  getDayStatus(workoutType) {
    const todaysWorkoutType = (this.currentDayNumber - 1 + this.offset) % 7;
    switch (true) {
      case todaysWorkoutType < workoutType: return 'future';
      case todaysWorkoutType > workoutType: return 'past';
      default: return 'current';
    }
  }

  banner(index) {
    switch (index) {
      case 0: return 'Recovery';
      case 4: case 5: return 'Taper';
      case 6: return this.isAthlete ? 'Gameday' : 'Rest';
      default: return 'Training';
    }
  }

  getWorkoutData(index) {
    const workoutTypeName = dayIndexMap[index];
    const workoutStatus = this.getDayStatus(index);
    return {
      workoutType: index.toString(),
      workoutTypeName,
      workoutCategory: index === 6
        ? this.isAthlete ? 'gameday' : 'rest'
        : workoutTypeName.substr(0, workoutTypeName.length - 1),
      bannerTitle: this.banner(index),
      isCurrent: workoutStatus === 'current',
      isFuture: workoutStatus === 'future',
      isPast: workoutStatus === 'past'
    };
  }

  /* returns workoutType for a given weekday relative to gameday */
  getRelativeWorkoutIndex(dayIndex) {
    return Math.abs(dayIndex + this.offset) % 7;
  }

  /* returns name of corresponding day number */
  getDayOfWeek(dayNum) { return moment().isoWeekday(dayNum).format('dddd'); }

  /* returns name of weekday for workout type relative to gameday */
  getWorkoutDayName(workoutType) {
    return this.getDayOfWeek(this.getRelativeWorkoutIndex(workoutType));
  }

  getDailySchedule(dayNumber) {
    const { workoutTemplates } = this.week.template;
    const dayIndex = dayNumber - 1;
    const relativeIndex = this.getRelativeWorkoutIndex(dayIndex);
    const metadata = this.getWorkoutData(relativeIndex);
    const date = moment().isoWeekday(dayNumber).format('YYYY-MM-DD');
    const injuryLimits = this.injuries.getInjuryLimits();
    if (!workoutTemplates) {
      return {
        relativeIndex,
        date,
        dayName: this.getDayOfWeek(dayNumber),
        dayIndex,
        dayNumber,
        metadata,
        template: {},
        hasCardio: false,
        hasWeights: false,
        injuryLimits
      };
    }
    const template = workoutTemplates[metadata.workoutTypeName] || {
      workoutType: 6,
      weightliftingActivityTemplates: [],
      cardioActivityTemplates: []
    };
    return {
      relativeIndex,
      date,
      dayName: this.getDayOfWeek(dayNumber),
      dayIndex,
      dayNumber,
      metadata,
      template,
      hasCardio:
        !_.isEmpty(template.cardioActivityTemplates) && injuryLimits.cardio,
      hasWeights:
        !_.isEmpty(template.weightliftingActivityTemplates) &&
        injuryLimits.weightlifting,
      injuryLimits
    };
  }

  getWeeklySchedule() {
    return _.reduce(_.range(0, 7), (memo, dayIndex) => {
      memo[dayIndex] = this.getDailySchedule(dayIndex + 1);
      return memo;
    }, {});
  }

  getCurrentDaySchedule() {
    return this.getDailySchedule(this.currentDayNumber);
  }
}

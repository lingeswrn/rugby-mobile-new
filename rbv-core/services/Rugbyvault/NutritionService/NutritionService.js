import _ from 'lodash';
import { NutritionMetrics } from './NutritionMetrics';

/* expects a populated instance of the user model from db (state.user.data) */
class Nutrition {
  constructor({ athleteProfile }) {
    const profile = athleteProfile;

    this.metrics = NutritionMetrics(profile);
    this.profile = profile;

    this.gender = athleteProfile.trainingPlanGender || 'male';
    this.goal = athleteProfile.weightGoal || 'maintain';
    this.mass = athleteProfile.massInKilograms || 80;
  }

  /* returns int value of athlete's required calories before workouts */
  get baseDailyCalories() { return this.getCalories(1440, 1); }

  /** calculates calories required to complete an activity
   * accepts – duration (in minutes): int, met value: int
   * returns – int (required calories value)
   */
  getCalories(min, met) {
    return _.round(min * met * this.mass * this.metrics.consumptionRate / 200);
  }

  getActivityCalories(duration, activity, type) {
    return this.getCalories(duration, this.metrics.getMetValue(activity, type));
  }

  getTotalCalories({ model, template }) {
    const noWeights = _.isEmpty(template.weightliftingActivityTemplates);
    const duration = noWeights ? 0 : _.has(model, 'duration') ?
      (model.duration / 60)  : template.estimatedDuration;
    const cardioDuration = _.has(model, 'duration') ?
      (model.cardioDuration / 60) : 30;
    return _.sum([
      this.baseDailyCalories,
      this.getActivityCalories(duration, 'weightlifting'),
      this.getActivityCalories(cardioDuration, 'run', 'aerobic')
    ]);
  }
}

export const NutritionService = (user) => new Nutrition(user);

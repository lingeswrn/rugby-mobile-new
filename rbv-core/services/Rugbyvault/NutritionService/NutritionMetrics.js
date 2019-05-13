export class Metrics {
  constructor(athleteProfile) {
    /* multiplier on a consumption calculations */
    this.metabolicConsumptionRate = { female: 3.5, male: 3.5 };

    /* the number of calories in a gram of each type of macrontrient */
    this.nutrientCaloriesPerGram = { carbs: 4, fat: 9, protein: 4 };

    /** NOTE: get changes in distribution based on goal;
     * macronutrient distribution by weight goal
     */
    this.nutrientDistribution = {
      gain: { carbs: 0.35, fat: 0.25, protein: 0.40 },
      lose: { carbs: 0.05, fat: 0.65, protein: 0.30 },
      maintain: { carbs: 0.4, fat: 0.3, protein: 0.3 }
    };

    this.metValues = {
      bike: { aerobic: 10, anaerobic: 12 },
      row: { aerobic: 7, anaerobic: 12 },
      run: { aerobic: 8, anaerobic: 10 },
      swim: { aerobic: 8, anaerobic: 10 },
      weightlifting: 6,
      match: 6.5
    };
    this.gender = athleteProfile.trainingPlanGender || 'male';
    this.goal = athleteProfile.weightGoal || 'maintain';
    this.mass = athleteProfile.massInKilograms || 80;
  }


  get consumptionRate() {
    return this.metabolicConsumptionRate[this.gender];
  }

  get distribution() { return this.nutrientDistribution[this.goal]; }

  getMetValue(activity, type) {
    if (type) return this.metValues[activity][type];
    return this.metValues[activity];
  }
}

export const NutritionMetrics = (athleteProfile) => new Metrics(athleteProfile);

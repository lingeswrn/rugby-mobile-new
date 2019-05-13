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

const staticLists = {
  'activity-templates': {},
  'body-parts': {},
  'cardio-profiles': {},
  'muscle-groups': {},
  'training-plan-templates': {},
  'weekly-routine-templates': {},
  'workout-templates': {}
};

const userRecords = {
  'activities': {},
  'daily-logs': {},
  'injuries': { populate: ['assessedBy', 'createdBy', 'muscleGroup', 'bodyPart']},
  'subscriptions': {},
  'training-plans': { populate: defaultPopulationConfig },
  'weekly-routines': {},
  'workouts': {}
};

export const defaultLists = { staticLists, userRecords };

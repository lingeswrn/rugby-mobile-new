import {
  ActivityShow,
  CardioActivity,
  WorkoutList,
  WorkoutSummary
} from './views';

import {
  ensureCardioActivity,
  ensureActivity,
  ensureTrainingPlan,
} from './hoc';

export const TrainingRoutes = [
  { component: ensureTrainingPlan(WorkoutList), path: '/weekly-routine' },
  { component: ensureActivity(ActivityShow), path: '/workouts/weightlifting' },
  { component: ensureCardioActivity(CardioActivity), path: '/workouts/cardio' },
  { component: WorkoutSummary, path: '/workouts/summary' },
];

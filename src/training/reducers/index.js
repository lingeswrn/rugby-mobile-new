import { combineReducers } from 'redux';
import {
  activityReducer,
  processActivityReducer
} from './activity';
import { workoutReducer } from './workout';
import { weeklyRoutineReducer } from './weeklyRoutine';
import { trainingPlanReducer } from './trainingPlan';

export const trainingReducer = combineReducers({
  trainingPlan: trainingPlanReducer,
  weeklyRoutine: weeklyRoutineReducer,
  workout: workoutReducer,
  activity: activityReducer,
  queue: processActivityReducer
});

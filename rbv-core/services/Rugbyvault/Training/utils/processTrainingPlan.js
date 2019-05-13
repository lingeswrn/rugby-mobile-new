/* eslint-disable no-unused-vars */
import {
  map as _map,
  omit as _omit
} from 'lodash';

export function processTrainingPlan(plan) {
  const { trainingPlanTemplate } = plan;
  return  {
    ...plan,
    trainingPlanTemplate: {
      ...trainingPlanTemplate,
      // surface workout templates from embedded list
      weeklyRoutineTemplates: _map(
        trainingPlanTemplate.weeklyRoutineTemplates,
        (template) => {
          return {
            ...template,
            workoutTemplates: _omit(template.workoutTemplates[0], '_id')
          };
        })
    }
  };
}

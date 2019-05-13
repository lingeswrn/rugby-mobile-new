import { AssessmentsListContainer } from './views';
import { getAssessments } from './hoc';

export const AssessmentsRoutes = [
  {
    component: getAssessments(AssessmentsListContainer),
    path: '/assessments'
  }
];

import _ from 'lodash';
import {
  BeepTest,
  BeepTestHistory,
  BeepTestInstructions,
  BeepTestIntroduction,
  BeepTestSummary,
  Dashboard,
  FitnessTestOptions,
  ManualEntry,
  StrengthTestHistory,
  StrengthTestInstructions,
  StrengthTestIntroduction,
  StrengthTestShow,
  StrengthTestSummary
} from './views';
import {
  ensureCompiledActivities,
  ensureCurrentBeepTest,
  ensureCurrentStrengthTest,
  getCompletedTests,
  getDashboardData
} from './hoc';

const dashboardRoutes = [
  {
    component: getDashboardData(Dashboard),
    path: '/fitness-tests'
  },
  {
    component: FitnessTestOptions,
    path: '/fitness-tests/select'
  }
];

const strengthTestRoutes = [
  {
    component: getCompletedTests(StrengthTestHistory),
    path: '/strength-test/completed'
  },
  {
    component: StrengthTestInstructions,
    path: '/strength-test/instructions'
  },
  {
    component: ensureCurrentStrengthTest(StrengthTestShow),
    path: '/strength-test/show'
  },
  {
    component: ensureCompiledActivities(StrengthTestSummary),
    path: '/strength-test/summary'
  },
  {
    component: StrengthTestIntroduction,
    path: '/strength-test/introduction'
  }
];

const beepTestRoutes = [
  {
    component: getCompletedTests(BeepTestHistory),
    path: '/beep-test/completed'
  },
  {
    component: BeepTestIntroduction,
    path: '/beep-test/introduction'
  },
  {
    component: BeepTestInstructions,
    path: '/beep-test/instructions'
  },
  {
    component: ensureCurrentBeepTest(BeepTest),
    path: '/beep-test/start'
  },
  {
    component: ManualEntry,
    path: '/beep-test/manual-entry'
  },
  {
    component: getCompletedTests(BeepTestSummary),
    path: '/beep-test/summary'
  }
];

export const FitnessTestRoutes = _.concat(
  dashboardRoutes,
  strengthTestRoutes,
  beepTestRoutes
);

import { ensureDailyLogs } from './hoc';
import { DailyLogShow } from './views';

export const DailyLogRoutes = [
  {
    component: ensureDailyLogs(DailyLogShow),
    path: '/daily-log'
  }
];

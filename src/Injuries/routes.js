import { InjuryList, InjuryCreate  } from './views';

export const InjuriesRoutes = [
  { component: InjuryList, path: '/injuries' },
  { component: InjuryCreate, path: '/injuries/create' }
];

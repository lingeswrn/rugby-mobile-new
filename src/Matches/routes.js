import { MatchList, MatchCreate  } from './views';

export const MatchesRoutes = [
  { component: MatchList, path: '/matches' },
  { component: MatchCreate, path: '/matches/create' }
];

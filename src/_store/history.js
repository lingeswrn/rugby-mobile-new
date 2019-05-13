import { createMemoryHistory } from 'history';

export const history = createMemoryHistory({
  initialEntries: ['/'],
  initialIndex: 0,
  keyLength: 6,
  getUserConfirmation: null
});

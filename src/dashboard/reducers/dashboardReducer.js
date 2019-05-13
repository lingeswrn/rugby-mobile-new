import { _global } from 'src/actionTypes';

const INIT = { lastSync: undefined };

export const dashboardReducer = (state = INIT, { type, meta }) => {
  switch(type) {
    case _global.SYNC: return { ...state, lastSync: meta.timestamp };
    case _global.RESET_USER_DATA:
    case _global.RESET_TRAINING_DATA:
    case _global.SIGN_OUT:
    case _global.DATA_VERSION_CHANGE:
      return INIT;
    default: return state;
  }
};

import types, { _global } from 'src/actionTypes';
import _ from 'lodash';

const INITIAL_STATE = {
  all: [],
  current: {},
  id: undefined,
  loading: true
};

export function dailyLogReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case _global.SYNC:
      return {
        ...state,
        all: payload.dailyLogs[0].entries,
        current: _.last(payload.dailyLogs[0].entries),
        id: payload.dailyLogs[0]._id,
        loading: false
      };
    case types.GET_DAILY_LOGS: return { ...state, ...payload };
    case types.SET_CURRENT_DAILY_LOG: return { ...state, current: payload };
    case types.SET_LOADING_STATUS: return { ...state, loading: payload };
    case _global.DATA_VERSION_CHANGE:
    case 'RESET_DAILY_LOGS':
    case _global.RESET_USER_DATA:
      return INITIAL_STATE;
    default: return state;
  }
}

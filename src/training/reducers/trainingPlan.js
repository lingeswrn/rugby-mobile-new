import types, { _global } from 'src/actionTypes';

const INITIAL_STATE = { current: {}, original: {}};

export function trainingPlanReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case types.GET_LATEST_TRAINING_PLAN:
      return { ...state, original: payload };
    case types.GET_TRAINING_PLAN_TEMPLATE: return { ...state };
    case types.PROCESS_TRAINING_PLAN:
    case types.UPDATE_CURRENT_TRAINING_PLAN:
      return { ...state, current: payload };
    case 'RESET_TRAINING_PLAN':
    case _global.RESET_TRAINING_DATA:
      return INITIAL_STATE;
    case _global.DATA_VERSION_CHANGE: return INITIAL_STATE;
    default: return state;
  }
}

import types, { _global } from 'src/actionTypes';

const INITIAL_STATE = {
  completed: [],
  previous: {},
  current: {},
};

export function fitnessTestReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case types.GET_BEEP_TESTS:
      return { ...state, completed: payload };
    case types.GET_PREV_BEEP_TEST:
      return { ...state, previous: payload };
    case types.SET_CURRENT_BEEP_TEST:
      return { ...state, current: { ...state.current, ...payload }};
    case types.RESET_CURRENT_BEEP_TEST:
      return { ...state, current: {}};
    case _global.RESET_USER_DATA:
      return INITIAL_STATE;
    case _global.RESET_TRAINING_DATA:
      return INITIAL_STATE;
    case _global.DATA_VERSION_CHANGE:
      return INITIAL_STATE;
    default:
      return state;
  }
}

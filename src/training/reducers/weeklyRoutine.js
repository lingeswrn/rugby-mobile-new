import types, { _global } from 'src/actionTypes';

const INITIAL_STATE = {
  activeTemplateId: undefined,
  activeId: undefined,
  all: [],
  current: {},
  original: {},
  template: {}
};

export function weeklyRoutineReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case _global.SYNC:
      return { ...state, all: payload.weeklyRoutines };
    case types.SET_CURRENT_WEEKLY_ROUTINE_TEMPLATE:
      return { ...state,
        current: { ...state.current, weeklyRoutineTemplate: payload },
        template: payload,
        activeTemplateId: payload._id
      };
    case types.SET_CURRENT_WEEKLY_ROUTINE:
      return { ...state,
        original: payload,
        current: payload,
        activeId: payload._id
      };
    case types.GET_CURRENT_PLAN_WEEKLY_ROUTINES:
      return { ...state, all: payload };
    case _global.RESET_TRAINING_DATA: return INITIAL_STATE;
    case _global.DATA_VERSION_CHANGE: return INITIAL_STATE;
    default: return state;
  }
}

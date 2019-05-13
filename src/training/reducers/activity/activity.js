import types, { _global } from 'src/actionTypes';

const INITIAL_STATE = {
  activityTemplate: {},
  cardioProfile: {},
  current: {
    activityIndex: 0,
    activityNumber: 1,
    model: {},
    template: {},
    metadata: {}
  },
  currentIndex: 0,
  currentSet: {
    reps: 0,
    weight: 1,
    setIndex: 0,
    setNumber: 1
  },
  pushed: [],
  metadata: {}
};

export function activityReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case types.MODIFY_CURRENT_ACTIVITY:
      return { ...state,
        current: { ...state.current,
          model: { ...state.current.model, ...payload }
        }
      };
    case types.SET_CURRENT_ACTIVITY_INDEX: return { ...state, ...payload };
    case types.UPDATE_CURRENT_ACTIVITY:
      return { ...state, pushed: state.pushed.concat(payload) };
    case types.SET_CURRENT_SET: case types.SET_CARDIO_SELECTIONS:
      return { ...state, ...payload };
    case types.UPDATE_CURRENT_SET:
      return { ...state, currentSet: { ...state.currentSet, ...payload }};
    case types.REPLACE_ACTIVITY_IN_WORKOUT:
      return { ...state, current: payload };
    case _global.SYNC: return { ...state, metadata: payload.user.metadata };
    case 'RESET_ACTIVITY_QUEUE': return INITIAL_STATE;
    case _global.RESET_TRAINING_DATA: return INITIAL_STATE;
    case _global.DATA_VERSION_CHANGE: return INITIAL_STATE;
    default: return state;
  }
}

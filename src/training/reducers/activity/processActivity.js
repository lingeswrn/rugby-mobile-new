import types, { _global } from 'src/actionTypes';

const INITIAL_STATE = {
  all: [],
  enqueuedWorkoutId: undefined,
  isCardio: false,
  pending: [],
  processing: {},
  processed: []
};

export const processActivityReducer =
(state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SET_QUEUE_FOR_WORKOUT: return { ...state, ...payload };
    case types.QUEUE_ACTIVITY:
      return { ...state, pending: state.pending.concat(payload) };
    case types.SELECT_ENQUEUED_ACTIVITY: return { ...state, ...payload };
    case types.ADD_PROCESSED_ACTIVITY:
      return { ...state,
        processed: state.processed.concat(payload),
        processing: {}
      };
    case types.REPLACE_ACTIVITY_IN_QUEUE: return { ...state, all: payload };
    case 'RESET_ACTIVITY_QUEUE': return INITIAL_STATE;
    case _global.RESET_TRAINING_DATA: return INITIAL_STATE;
    case _global.DATA_VERSION_CHANGE: return INITIAL_STATE;
    default: return state;
  }
};

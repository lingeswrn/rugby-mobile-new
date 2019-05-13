import types, { _global } from 'src/actionTypes';
import _ from 'lodash';

const INITIAL_STATE = {
  all: [],
  selectedId: undefined,
  current: {},
  day: undefined,
  dayIndex: undefined,
  original: {},
  thisWeek: [],
  segmentSelectorIsOpen: false,
  selectedSegment: '',
  template: {}
};

export function workoutReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case types.CREATE_WORKOUT:
      return {
        ...state,
        original: payload,
        current: payload,
        thisWeek: _.concat(state.thisWeek, payload),
        all: _.concat(state.thisWeek, payload),
      };
    case types.SELECT_WORKOUT_SEGMENT:
      return { ...state, selectedSegment: payload };
    case types.SET_CURRENT_WORKOUT:
      return { ...state, current: payload, original: payload };
    case types.SET_CURRENT_WORKOUT_TEMPLATE:
      return { ...state, template: payload };
    case types.SET_LATEST_WORKOUTS: return { ...state, thisWeek: payload };
    case types.SET_DAY: return { ...state, ...payload };
    case types.SET_SELECTED_ID: return { ...state, selectedId: payload };
    case types.UPDATE_CURRENT_WORKOUT: return { ...state, ...payload };
    case _global.SYNC: return { ...state, all: payload.workouts };
    case _global.RESET_TRAINING_DATA: return INITIAL_STATE;
    case _global.DATA_VERSION_CHANGE: return INITIAL_STATE;
    default: return state;
  }
}

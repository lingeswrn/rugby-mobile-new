import types, { _global } from 'src/actionTypes';

const INITIAL_STATE = { all: [], editing: {}, listMetadata: {}};

export const injuriesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.GET_INJURIES: return { ...state, all: payload };
    case types.SET_EDITING_INJURY: return { ...state, editing: payload };
    case _global.SYNC: return { ...state, all: payload.injuries };
    case _global.DATA_VERSION_CHANGE: return INITIAL_STATE;
    case _global.KEYSTONE:
      return { ...state, listMetadata: payload.lists.Injury };
    default: return state;
  }
};

import types, { _global } from 'src/actionTypes';
const INITIAL_STATE = { all: [], editing: {}};

export const matchesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.GET_MATCHES: return { ...state, all: payload };
    case types.SET_EDITING_MATCH: return { ...state, editing: payload };
    case _global.DATA_VERSION_CHANGE: return INITIAL_STATE;
    default: return state;
  }
};

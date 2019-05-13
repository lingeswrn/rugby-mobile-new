import types, { _global } from 'src/actionTypes';

const INIT = { editing: false };

export const athleteProfileReducer = (state = INIT, { type, payload }) => {
  switch (type) {
    case types.SET_SETTINGS_EDITING_STATUS:
      return { ...state, editing: payload };
    case _global.DATA_VERSION_CHANGE: return INIT;
    default: return state;
  }
};

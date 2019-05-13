import types, { _global } from 'src/actionTypes';
import _ from 'lodash';

const INITIAL_STATE = { dataVersion: 0, metadata: {}, resetOnUpdate: false };

export const appReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case types.UPDATE_USER_RESET_SETTING:
      return { ...state, resetOnUpdate: payload };
    case types.GET_USER_CUSTOM_DATA:
      if (!payload.data || _.isUndefined(payload.data.isAdmin)) return state;
      return { ...state, resetOnUpdate: payload.data.isAdmin };
    case types.UPDATE_APP_DATA_VERSION:
      return { ...state, dataVersion: payload };
    case _global.KEYSTONE: return { ...state, metadata: {
      options: payload._options,
      lists: payload.lists,
      paths: payload.paths
    }};
    default: return state;
  }
};

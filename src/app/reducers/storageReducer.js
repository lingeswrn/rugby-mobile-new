import { LOAD, SAVE } from 'redux-storage';

export const storageReducer = (state = { loaded: false }, { type }) => {
  switch (type) {
    case LOAD: return { ...state, loaded: true };
    case SAVE: return state;
    default: return state;
  }
};

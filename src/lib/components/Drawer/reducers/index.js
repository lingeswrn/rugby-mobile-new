import types from 'src/actionTypes';

export const drawerReducer = (state = { isOpen: false }, { type, payload }) => {
  switch (type) {
    case types.SET_DRAWER_STATE: return { ...state, isOpen: payload };
    default: return state;
  }
};

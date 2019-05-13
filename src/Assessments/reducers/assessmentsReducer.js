import types from 'src/actionTypes';

const INIT_STATE = {
  all: []
};

export const assessmentsReducer = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case types.GET_ASSESSMENTS:
      return { ...state, all: payload };
    default:
      return state;
  }
};

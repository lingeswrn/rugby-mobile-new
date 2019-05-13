import * as types from '../actions/types';
const INITIAL_STATE = { loading: true, complete: false };

export const loaderReducer = (state = {}, { id, type, payload }) => {
  switch(type) {
    case types.START:
    case types.COMPLETE:
      return { ...state,
        [id]: { ...state[id], loading: payload, complete: !payload }
      };
    case types.RESET: return { ...state, [id]: INITIAL_STATE };
    default: return state;
  }
};

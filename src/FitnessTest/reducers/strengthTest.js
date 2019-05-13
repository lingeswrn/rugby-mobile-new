import types, { _global } from 'src/actionTypes';

const INITIAL_STATE = {
  compiledActivities: [],
  completed: [],
  completedActivities: [],
  current: {},
  currentActivity: {},
  enqueuedActivities: [],
  isFirstTest: false,
  previous: {},
  currentIndex: 0
};

export function strengthTestReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case types.GET_CURRENT_STRENGTH_TEST: return { ...state, current: payload };
    case types.GET_PREV_STRENGTH_TEST: return { ...state, previous: payload };
    case types.GET_COMPLETED_STRENGTH_TESTS:
      return { ...state, completed: payload };
    case types.GET_AVAILABLE_STRENGTH_TEST_ACTIVITIES:
      return { ...state, enqueuedActivities: payload };
    case types.ADD_COMPLETED_STRENGTH_TEST_ACTIVITY:
      return { ...state,
        completedActivities: state.completedActivities.concat(payload)
      };
    case types.UPDATE_COMPLETED_STRENGTH_TEST_ACTIVITY:
      return { ...state,
        completedActivities: payload
      };
    case types.MODIFY_ACTIVE_STRENGTH_TEST_ACTIVITY_MODEL:
      return { ...state,
        currentActivity: { ...state.currentActivity, ...payload }
      };
    case types.COMPILE_STRENGTH_TEST_ACTIVITIES:
      return { ...state, compiledActivities: payload };
    case types.SET_CURRENT_STRENGTH_TEST:
      return { ...state, current: payload };
    case types.SET_FIRST_TEST_FLAG: return { ...state, isFirstTest: payload };
    case 'CLEAR_COMPLETED_STRENGTH_TEST_ACTIVITIES':
      return { ...state, completedActivities: []};
    case types.NAVIGATE_ACTIVITY: return { ...state, currentIndex: payload };
    case 'CLEAR_STRENGTH_TEST_QUEUES':
    case _global.RESET_USER_DATA: return INITIAL_STATE;
    case _global.RESET_TRAINING_DATA: return INITIAL_STATE;
    case _global.DATA_VERSION_CHANGE: return INITIAL_STATE;
    default: return state;
  }
}

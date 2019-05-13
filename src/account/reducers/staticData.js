import types, { _global } from 'src/actionTypes';

const INITIAL_STATE = {
  activityTemplates: [],
  bodyParts: [],
  cardioProfiles: [],
  muscleGroups: [],
  trainingPlanTemplates: [],
  weeklyRoutineTemplates: [],
  workoutTemplates: []
};

export function staticDataReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case types.GET_STATIC_DATA: return { ...state, ...payload };
    case _global.SYNC: return payload.staticData;
    case 'RESET_STATIC_DATA': return INITIAL_STATE;
    default: return state;
  }
}

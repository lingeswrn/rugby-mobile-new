import types from 'src/actionTypes';
import { TrainingPlan, WeeklyRoutine } from 'rbv-core/services/Rugbyvault/Training';

const getCurrentPlanWeeklyRoutines = () => (dispatch, getState) => {
  const { current } = getState().training.trainingPlan;
  const fetchedRoutines = getState().training.weeklyRoutine.all;
  if (!fetchedRoutines.length) {
    return TrainingPlan(current).getWeeklyRoutines()
    .then((payload) => {
      dispatch({
        type: types.GET_CURRENT_PLAN_WEEKLY_ROUTINES,
        payload
      });
      return Promise.resolve(payload);
    });
  }
  return Promise.resolve(fetchedRoutines);
};

function setCurrentWeeklyRoutine(routines) {
  return (dispatch, getState) => {
    return WeeklyRoutine(getState().training.trainingPlan.current)
    .getOrCreateCurrentWeeklyRoutine(routines, getState().user)
    .then((payload) => {
      dispatch({ type: types.SET_CURRENT_WEEKLY_ROUTINE, payload });
      return Promise.resolve(payload);
    });
  };
}

function setCurrentWeekTemplate(template) {
  return (dispatch, getState) => {
    const { current } = getState().training.trainingPlan;
    return WeeklyRoutine(current).processWeeklyRoutineTemplate(template)
    .then((payload) => {
      dispatch({ type: types.SET_CURRENT_WEEKLY_ROUTINE_TEMPLATE, payload });
      return Promise.resolve(payload);
    });
  };
}

export function buildWeeklyRoutine() {
  return(dispatch, getState) => {
    return dispatch(getCurrentPlanWeeklyRoutines())
    .then((routines) => dispatch(setCurrentWeeklyRoutine(
      routines, getState().user)
    ))
    .then(({ weeklyRoutineTemplate }) =>
      dispatch(setCurrentWeekTemplate(weeklyRoutineTemplate))
    );
  };
}

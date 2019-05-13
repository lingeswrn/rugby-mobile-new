import types from 'src/actionTypes';

import _ from 'lodash';
import { TrainingUtils } from 'rbv-core/services/Rugbyvault/Training';
import { getStaticData } from 'src/account/actions/staticData';

function scrubQueue() {
  return (dispatch, getState) => {
    const { queue, workout } = getState().training;
    const { all } = queue;
    let isNewWorkout = true;
    if (all && all.length) {
      const segmentType = workout.selectedSegment === 'cardio' ?
        'cardio' : 'lifting';
      const activity = queue.all[0] || {};
      // set new workout flag based on the following:
      isNewWorkout = (
        // current workout id doesn't match workout on activity on activty model
        workout.current._id !== activity.model.workout ||
        // OR template training type doesn't match segment type
        (
          activity.template &&
          activity.template.activity.trainingType !== segmentType
        )
      );
    }
    if (_.isEmpty(all) || isNewWorkout) {
      dispatch({ type: 'RESET_ACTIVITY_QUEUE' });
    }
    return Promise.resolve();
  };
}

// sets queue for for workout
// adds cardio workout to queue but does not prep.
// cardio prep takes place after user selections (see ./activity)
export function prepActivities(isCardio = false) {
  return (dispatch, getState) => dispatch(scrubQueue())
  .then(() => dispatch(getStaticData()))
  .then(() => {
    const selectedSegment = getState().training.workout.selectedSegment;
    const selected = _.isEmpty(selectedSegment) ?
      isCardio ? 'cardio' : 'weightlifting' : selectedSegment;
    return TrainingUtils.populateActivityTemplates(getState, selected)
    .then((templates) => TrainingUtils.prepActivities(
      templates,
      selected,
      getState().user.data.athleteProfile.strengthTest,
      getState().injuries
    ))
    .then((all) => {
      // check that queue has length and model property before assigning
      const firstTemplate = !_.isEmpty(all) && _.has(all[0], ['model']) ?
        all[0].model : {};
      dispatch({
        type: types.SET_QUEUE_FOR_WORKOUT,
        payload: {
          all,
          enqueuedWorkoutId: firstTemplate.workout,
          isCardio
        }
      });
      return Promise.resolve(all);
    });
  });
}

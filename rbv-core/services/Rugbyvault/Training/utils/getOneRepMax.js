import { weightToEffortRatios } from './weightToEffortRatios';
import { round as _round } from 'lodash';

export function getOneRepMax(weight, reps) {
  if (reps > 0 && reps < 16) {
    return Promise.resolve(_round(weight / weightToEffortRatios[reps]));
  } else if ( reps >= 16) {
    return Promise.resolve(_round(weight / ((100 - reps) / 2)));
  } else if (reps === 0) {
    return Promise.resolve(0);
  }
  return Promise.reject({
    message: `could not calculate 1RM from ${reps} reps @ weight ${weight}`
  });
}

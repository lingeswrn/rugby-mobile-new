import _ from 'lodash';
import { weightToEffortRatios } from '../weightToEffortRatios';
import { InjuryService } from '../../../InjuryService';

const roundTo = (number) => {
  const interval = 5;
  return (_.round(number / interval) * interval);
};

const getWeight = (reps, oneRepMax, load = 1) => {
  if (oneRepMax === 0) {console.log({ reps, oneRepMax, load });}
  return reps.map((rep) => {
    if (rep > 0 && rep < 16) {
      return roundTo(weightToEffortRatios[rep] * oneRepMax * load);
    }
    return roundTo(((100 - rep) / 2) * oneRepMax * load);
  });
};

const arrayify = (len, val = 0, load = 1) => {
  return _.times(len, _.constant(val * load));
};

const getOneRepMaxFromStrengthTest = (template, strengthTest) => {
  const { _id } = template.activity.primaryMuscleGroup;
  const activity = _.find(strengthTest.activities, { muscleGroup: _id });
  if (!activity) return 1;
  return activity.oneRepMax ? activity.oneRepMax : 1;
};

// pulls initial target value from template and metadata
const getInitialValues = (
  { template, model, metadata }, strengthTest, load
) => {
  const { isSuperset } = template;
  let targetReps = template.reps;
  let targetWeight = undefined;
  let oneRepMax = metadata.oneRepMax;
  let sets = _.isArray(targetReps) ? targetReps.length : 0;
  // get 1RM from strength test as a fallback
  if (metadata.timesCompleted === 0 || metadata.oneRepMax === 0) {
    oneRepMax = getOneRepMaxFromStrengthTest(template, strengthTest);
  }
  // set 'sets' value directly if it's a superset;
  if (isSuperset === true) {
    sets = template.sets;
    targetWeight = arrayify(sets, roundTo(oneRepMax * 0.4), load);
    targetReps = arrayify(sets);
  } else {
    targetWeight = getWeight(targetReps, oneRepMax, load);
  }

  if (oneRepMax === 0) {
    console.log('ONE REP MAX IS ZERO', { template, model, metadata });
  }

  return {
    // model is the doc - when everything is prepped, values are set to 0
    model: {
      ...model,
      isSuperset,
      reps: arrayify(sets),
      weightBySet: arrayify(sets)
    },
    // THIS is the goals
    target: {
      oneRepMax,
      reps: targetReps,
      sets,
      weight: targetWeight,
    }
  };
};

const scrubTemplate = populated => {
  const { reps, sets, isSuperset } = populated.template;
  // if it's a superset & there aren't any sets OR if there are no reps just
  // --- set to 3
  if ((isSuperset && !sets) || _.isEmpty(reps)) {
    return {
      ...populated,
      template: { ...populated.template, sets: 3, isSuperset: true }
    };
  }
  return populated;
};


export const prepActivity = (populated, activityIndex, strengthTest, load) => {
  const scrubbed = scrubTemplate(populated);
  return Promise.resolve({
    ...scrubbed,
    ...getInitialValues(scrubbed, strengthTest, load),
    activityIndex,
    activityNumber: activityIndex + 1
  });
};

export const prepActivities = (templates, strengthTest, injuries) => {
  const _injuries = new InjuryService(injuries);
  const maxLoad = _injuries.getInjuryLimits().load;

  return Promise.all(_.map(templates, (template, ind) =>
    prepActivity(template, ind, strengthTest, maxLoad)));
};

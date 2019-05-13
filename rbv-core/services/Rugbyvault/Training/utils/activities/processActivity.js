import { getOneRepMax } from '../getOneRepMax';
import _ from 'lodash';

const createRepsObject = (userReps, targetReps) => {
  return targetReps.map((targetSet, index) => {
    const userSet = userReps[index] || 0;
    const off = targetSet - userSet;
    const over = userSet - targetSet;
    return {
      target: targetSet,
      user: userSet,
      offTarget: off > 0 ? off : false,
      overTarget: over > 0 ? over : false
    };
  });
};

const getAllOneRepMaxes = (weight, reps) => Promise.all(
  weight.map((setWeight, index) => {
    return getOneRepMax(setWeight, reps[index]);
  })
);

const getPercentLifted = (reps, targetReps, weight, targetWeight) => {
  const totalWeight = _.sum(
    reps.map((rep, index) => {
      const weightForSet = weight[index] || 0;
      return rep * weightForSet;
    })
  );
  const totalTargetWeight = _.sum(
    targetReps.map((rep, index) => {
      const weightForSet = targetWeight[index] || 0;
      return rep * weightForSet;
    })
  );

  return _.round(totalWeight / totalTargetWeight, 3);
};

export const scoreActivity = async({ model, target }) => {
  const complete = _.sum(model.reps);
  const targetReps = _.sum(target.reps);
  const percentComplete = complete > 0 ? _.round(complete / targetReps, 3) : 0;
  const percentLifted =
    complete > 0
      ? getPercentLifted(
        model.reps,
        target.reps,
        model.weightBySet,
        target.weight
      )
      : 0;
  const oneRepMaxBySet = await getAllOneRepMaxes(model.weightBySet, model.reps);
  const score = _.sum([percentComplete * 0.5, percentLifted * 0.5]);
  return {
    complete,
    target: targetReps,
    percentComplete,
    percentLifted,
    oneRepMaxBySet,
    oneRepMax: _.max(oneRepMaxBySet),
    score
  };
};

export const processActivity = async activity => {
  const { model, model: { reps }, target } = activity;
  const scoring = await scoreActivity({ model, target });
  const { score, oneRepMax } = scoring;
  const stats = {
    reps: createRepsObject(reps, target.reps),
    oneRepMax,
    scoring
  };
  const processedActivity = {
    ...activity,
    ...stats,
    doc: {
      ..._.omit(activity, ['model']),
      ...model,
      status: 'complete',
      score,
      oneRepMax
    }
  };
  return Promise.resolve(processedActivity);
};

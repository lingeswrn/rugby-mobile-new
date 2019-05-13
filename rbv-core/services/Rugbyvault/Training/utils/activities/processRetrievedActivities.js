import _ from 'lodash';
import { scoreActivity } from './processActivity';

const processRetrievedActivity = async(doc, current) => {
  const { target } = current;
  const model = { ...current.model, ...doc };
  const scoring = await scoreActivity({ model, target });
  return Promise.resolve({ ...current, model, scoring });
};

const getProcessedActivities = async(_docs, all) => {
  const docs = _.uniqBy(_docs, 'workoutIndex');
  return Promise.all(
    _.compact(_.map(docs, doc => {
      const current = _.find(all, { activityIndex: doc.workoutIndex });
      console.log(`current ${doc.workoutIndex}`, current);
      if (doc.status === 'incomplete' || !current) return null;
      return processRetrievedActivity(doc, current);
    }))
  );
};

const getAllActivities = (docs, all) => {
  return _.map(all, activity => {
    const activityTemplate = activity.template.activity._id;
    const doc = _.find(docs, { activityTemplate });
    if (!doc) return activity;
    return {
      ...activity,
      model: { ...activity.model, ...doc }
    };
  });
};

export const processRetrievedActivities = async(docs, _all) => {
  const processed = await getProcessedActivities(docs, _all);
  const all = getAllActivities(docs, _all);
  return Promise.resolve({ processed, all });
};

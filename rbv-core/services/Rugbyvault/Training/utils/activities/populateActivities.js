import _ from 'lodash';
// import { RugbyvaultApi } from '../../../RugbyvaultApi';


/** gets user's activity metadata for set of template ids
 * accepts
 * activities: array of metadata.activities
 * templates: array of activityTemplate ids
 */
function getOrCreateActivityMetadata(activities, templates) {
  const findOne = (template) => ({
    template,
    oneRepMax: 0,
    scoreHistory: [],
    timesCompleted: 0,
    firstCompleted: null,
    lastCompleted: null,
    ..._.find(activities, { template })
  });

  if (_.isArray(templates)) return Promise.resolve(_.map(templates, findOne));
  return Promise.resolve(findOne(templates));
}

// just returns activity template id from template
// used to be more complicated
function depopulateActivityTemplates(templates) {
  return _.map(templates, ({ activity }) => activity);
}

/** puts the activity template stuff together
 * accepts:
 * _id (string)
 * staticData (object – in redux store @ state.staticData)
 *
 * returns: populated template (object)
*/
export function populateTemplate(_id, { muscleGroups, activityTemplates }) {
  // consolidates lookups
  const findById = (id, data) => _.find(data, { _id: id });

  const template = findById(_id, activityTemplates);
  if (!template) return null;
  let { primaryMuscleGroup, secondaryMuscleGroups } = template;
  if (typeof primaryMuscleGroup === 'string') {
    primaryMuscleGroup = findById(primaryMuscleGroup, muscleGroups);
  }
  if (_.isArray(secondaryMuscleGroups) && secondaryMuscleGroups.length) {
    secondaryMuscleGroups = secondaryMuscleGroups.map(
      (secondaryMuscleGroup) => findById(secondaryMuscleGroup, muscleGroups)
    );
  }
  return { ...template, primaryMuscleGroup, secondaryMuscleGroups };
}
/* handles activityReplacement in an **ALREADY-CONSTRUCTED** workout */
export const replaceTemplateInActivity = (getState, newId) => {
  const { training, staticData } = getState();
  const { current, metadata } = training.activity;

  return getOrCreateActivityMetadata(metadata.activities, newId)
  .then((mData) => Promise.resolve({
    ...current,
    metadata: mData,
    model: { ...current.model, activityTemplate: mData.template },
    template: { ...current.template,
      activity: populateTemplate(mData.template, staticData)
    }
  }));
};

/** populates all activity templates for selected workout segment
 * accepts:
 * --- getState (function - from redux action creator)
 */
export function populateActivityTemplates(getState) {
  const user = getState().user.data._id;
  const {
    current, template: { weightliftingActivityTemplates }
  } = getState().training.workout;
  const { metadata } = getState().user.data;

  const modelDefaults = {
    distance: 0,
    status: 'incomplete',
    time: 0,
    trainingPlan: current.trainingPlan,
    user,
    weeklyRoutine: current.weeklyRoutine,
    workout: current._id,
  };

  const templateIds = depopulateActivityTemplates(
    weightliftingActivityTemplates
  );
  return getOrCreateActivityMetadata(metadata.activities, templateIds)
  // iterate over returned list and construct the model used in workouts
  .then((list) => {
    return _.compact(list.map((metadatum, index) => {
      const activityTemplate = populateTemplate(
        metadatum.template, getState().staticData
      );
      if (!activityTemplate) {
        return null;
      }
      return {
        model: {
          ...modelDefaults,
          activityTemplate: metadatum.template,
          distance: null,
          heartRate: null,
          perceivedDifficulty: 5,
          reps: [],
          score: 0,
          sets: undefined,
          status: 'incomplete',
          time: null,
          weight: undefined,
          weightBySet: [],
          workoutIndex: index
        },
        template: {
          ..._.find(
            weightliftingActivityTemplates, { activity: metadatum.template }
          ),
          activity: activityTemplate
        },
        metadata: metadatum
      };
    }));
  });
}

/* STRENTGH TEST SHIT */
export const populateTemplates = (activities, templates, prop) =>
  _.map(activities, (activity) => {
    const _id = _.isString(activity[prop]) ? activity[prop] :
      _.has(activity, [prop, '_id']) ? activity[prop]._id : null;
    if (!_id) {
      return new Error({ message: 'trainingUtils.populateActivities received invalid activtiy of type: ' + typeof activity });
    }
    return {
      ...activity,
      [`${prop}`]: _.find(templates, { _id: activity[`${prop}`] })
    };
  }
  );

export const populateActivities =
(activities, staticData, prop = 'activityTemplate') => {
  const { activityTemplates, muscleGroups } = staticData;
  const populated = populateTemplates(activities, activityTemplates, prop);
  return _.map(populated, (activity) => {
    let { activityTemplate } = activity;
    if (typeof activityTemplate === 'string') {
      activityTemplate = _.find(activityTemplates, { _id: activityTemplate });
    }
    if (!activityTemplate) return null;
    return {
      ...activity,
      activityTemplate: {
        ...activityTemplate,
        primaryMuscleGroup: _.find(
          muscleGroups,
          { _id: activityTemplate.primaryMuscleGroup }
        )
      }
    };
  });
};

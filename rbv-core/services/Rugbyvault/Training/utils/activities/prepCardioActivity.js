import _ from 'lodash';
import moment from 'moment';

// step 1 of buildSegments; repeats segments to fill activity base time length
function repeatSegments(segments, count) {
  let constructed = [];
  _.times(
    count,
    () => {
      constructed = _.concat(constructed, segments);
      return;
    }
  );
  return Promise.resolve(constructed);
}

// step 2 of buildSegments; adds warmup and cooldown per cardio profile specs
function addWarmupAndCooldown(initial, cardioProfile) {
  const { addWarmup, addCooldown, warmupTime, cooldownTime } = cardioProfile;
  let segments = initial;
  if (addWarmup) {
    segments = _.concat([{
      time: warmupTime,
      effort: 0.5,
      isWarmup: true
    }], segments);
  }
  if (addCooldown) {
    segments = _.concat(segments, [{
      time: cooldownTime,
      effort: 0.5,
      isCooldown: true
    }]);
  }
  return Promise.resolve(segments);
}

// step 3 of buildSegments; adds supplemental segment data
function addSegmentData(segments, MHR) {
  let startTime = 0;
  return Promise.all(
    _.map(segments, ({ time, effort, ...rest }, index) => {
      startTime = startTime + time;
      return Promise.resolve({
        THR: _.round((effort * MHR)),
        durationMinutes: time,
        durationSeconds: time * 60,
        effort,
        endTime: (startTime * 60),
        segmentNumber: index + 1,
        startTime: ((startTime - time) * 60),
        ...rest
      });
    })
  );
}

function buildSegments(cardioProfile, user) {
  const { dateOfBirth } = user.data.athleteProfile;
  const MHR = (220 - moment().diff(dateOfBirth, 'years'));
  const { baseTime, segments } = cardioProfile;
  let cycleCount = _.floor((baseTime / _.sumBy(segments, 'time')));
  if (!cycleCount) cycleCount = 1;
  const scrubbedSegments = _.map(segments, (segment) =>
    _.omit({ ...segment, isTraining: true }, '_.id')
  );

  return repeatSegments(scrubbedSegments, cycleCount)
  .then((repeated) => addWarmupAndCooldown(repeated, cardioProfile))
  .then((allSegments) => addSegmentData(allSegments, MHR))
  .then((cardioSegments) => {
    return Promise.resolve({
      cardioSegments,
      cardioTotals: {
        duration: _.sumBy(cardioSegments, 'durationSeconds')
      }
    });
  });
}

export const buildCardioActivity = (getState) => {
  const { staticData, user, training } = getState();
  const model = training.activity.current.model;
  // cardioProfile is now saved to activity, but may still exist on workout
  // --- some places
  const cardioProfile =
    model.cardioProfile || training.workout.current.cardioProfile;

  const template = _.find(
    staticData.activityTemplates,
    { _id: model.activityTemplate }
  );
  const profile = _.find(
    staticData.cardioProfiles,
    { _id: cardioProfile }
  );

  return buildSegments(profile, user)
  .then(({ cardioSegments, cardioTotals }) => {
    return Promise.resolve({
      templateData: { template, profile },
      cardio: { cardioSegments, cardioTotals }
    });
  });
};

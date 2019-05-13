import _ from 'lodash';
import moment from 'moment';
const autoShutdownTypes = ['concussion', 'break', 'tear'];

class Injury {
  constructor(injuries) {
    /* expects state.injuries */
    this.injuries = injuries.all;
  }
  getOpenInjuries(date) {
    return _.filter(this.injuries, ({ occurredOn, status }) => (
      status !== 'closed' &&
      moment(occurredOn, 'YYYY-MM-DD').isSameOrBefore(date)
    ));
  }

  getCurrentAssessment(assessments) {
    if (_.isEmpty(assessments)) return {};
    if (assessments.length === 1) return assessments[0];
    return _.reduce(assessments, (latest, assessment) => {
      if (!assessment.assessedOn) return latest;
      const prevDate = moment(latest.assessedOn, 'YYYY-MM-DD');
      const newDate = moment(assessment.assesedOn, 'YYYY-MM-DD');
      if (moment(newDate).isValid) return latest;
      if (newDate.isSameOrAfter(prevDate)) return assessment;
      return latest;
    }, assessments[0]);
  }

  getRecoveryDays(assessment) {
    const { isShutDown, recoveryDuration } = assessment;
    if (isShutDown) {
      const { allowLiftingAfter, shutdownDuration } = assessment;
      const recoveryWithShutdown = shutdownDuration + recoveryDuration;
      switch(true) {
        case allowLiftingAfter: return recoveryWithShutdown - allowLiftingAfter;
        default: return recoveryWithShutdown;
      }
    } return recoveryDuration;
  }

  getInjuryLimits(workoutDate /* = moment().format('YYYY-MM-DD') */) {
    const dateMoment = moment(workoutDate);
    const daysInFuture = dateMoment.diff(moment(), 'days') + 1;
    const defaults = {
      injuryId: undefined, cardio: true, load: 1, weightlifting: true
    };
    const active = this.getOpenInjuries(dateMoment);
    if (_.isEmpty(active)) return defaults;
    const limits =  _.map(active, (injury) => {
      // latest assessment determines injuries
      const assessment = _.last(injury.assessments);
      console.log('all', injury.assessments, 'active', assessment);
      const injurySpecs = {
        injuryId: injury._id,
        type: injury.type,
        bodyPart: injury.bodyPart.name
      };
      if (injury.status === 'new') {
        if (_.includes(autoShutdownTypes, injury.type)) {
          return {
            cardio: true,
            weightlifting: false,
            load: 0,
            ...injurySpecs
          };
        } return { ...defaults, ...injurySpecs };
      }
      const {
        assessedOn,
        isShutDown,
        shutdownDuration,
        recoveryDuration
      } = assessment;
      const assessedOnMoment = moment(assessedOn);
      const elapsedDays = moment().diff(assessedOnMoment, 'days') + daysInFuture;
      const proportionalLoad = _.round(elapsedDays / recoveryDuration, 2);
      if (dateMoment.isBefore(assessedOnMoment, 'day')) {
        return { ...defaults, ...injurySpecs };
      }
      if ((isShutDown && (shutdownDuration > elapsedDays)) ) {
        const {
          allowCardioAfter = shutdownDuration,
          allowLiftingAfter = shutdownDuration
        } = assessment;
        const weightlifting = proportionalLoad === 0
          ? false : allowLiftingAfter < elapsedDays;
        return {
          ...defaults,
          ...injurySpecs,
          weightlifting,
          cardio: allowCardioAfter < elapsedDays,
          load: proportionalLoad
        };
        /* set load if shutdown is no longer in effect */
      } else if (recoveryDuration > elapsedDays) {
        return {
          ...defaults,
          ...injurySpecs,
          load: proportionalLoad,
          weightlifting: !(proportionalLoad === 0)
        };
      } return { ...defaults, ...injurySpecs };
    });
    const retVal = _.minBy(limits, 'load');
    return retVal;
  }

  // used in web application
  // NOTE for keys that return number of days, this returns an array for each
  // key with the number of days and the date.
  // EXAMPLE if recoveryDuration was set to 4 then this will return
  // recoveryDuration: [4, 'MMM D, YYYY'], where the date is 4 days past the
  // date when the assessment was recorded
  formatAssessmentsData(assessments) {
    const filteredAssessments = _.map(assessments, (assessment) => {
      return _.pick(assessment, [
        'severity',
        'isShutDown',
        'shutdownDuration',
        'allowCardioAfter',
        'allowLiftingAfter',
        'recoveryDuration',
        'avoidLoadDuration',
        'reAssessOn',
        'assessedBy',
        'assessedOn',
        'notes'
      ]);
    });
    const prettifyData = _.map(filteredAssessments, assessment => {
      const daysUntilRecover =
        (_.isUndefined(assessment.shutdownDuration)) ?
          0 : assessment.shutdownDuration;
      return _.mapValues(assessment, (value, key) => {
        switch(key) {
          case('assessedBy'):
            return !value
              ? '-'
              : value.name
                ? `${value.name.first} ${value.name.last}`
                : value.email;
          case('assessedOn'):
            return _.isEmpty(value) ? '-' : moment(value).format('MMM D, YYYY');
          case('recoveryDuration'):
          case('avoidLoadDuration'):
            return ([
              (value + daysUntilRecover),
              moment(assessment.assessedOn)
              .add(daysUntilRecover + value, 'days')
              .format('MMM D, YYYY')
            ]);
          case('shutdownDuration'):
          case('allowCardioAfter'):
          case('allowLiftingAfter'):
            return ([
              value,
              moment(assessment.assessedOn).add(value, 'days').format('MMM D, YYYY')
            ]);
          case('reAssessOn'):
            return _.isEmpty(value) ? '-' : moment(value).format('MMM D, YYYY');
          case('notes'): return value;
          case('isShutDown'):
            return value ? 'Yes' : 'No';
          default: return _.startCase(value);
        }
      });
    });
    const orderedData = _.reverse(_.sortBy(prettifyData, ['assessedOn']));
    return orderedData;
  }

  // used in web
  formatInjuryData(injury) {
    const filteredData = _.pick(injury, ['status', 'type', 'user', 'bodyPart', 'occurredOn', 'reportedPainLevel', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt', 'notes']);
    const prettifyData = _.mapValues(filteredData, (value, key) => {
      switch(key) {
        case('createdBy'):
        case('updatedBy'):
        case ('user'):
          return !value
            ? '-'
            : value.name
              ? `${value.name.first} ${value.name.last}`
              : value.email;
        case ('createdAt'):
        case ('occurredOn'):
        case ('updatedAt'):
          return _.isUndefined(value) ? '-' : moment(value).format('MMM D, YYYY');
        case 'bodyPart': return _.isUndefined(value) ? '-' : value.name;
        case 'notes': return _.isUndefined(value) ? '-' : value;
        default: return _.isUndefined(value) ? '-' : _.startCase(value);
      }
    });
    return prettifyData;
  }
}

export const InjuryService = (injuries) => new Injury(injuries);

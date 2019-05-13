/* eslint-disable no-unused-vars, no-dupe-keys */
import _ from 'lodash';
import { SocketService } from '../../SocketService';

export class ActivityService {
  constructor(workout, activities) {
    this.workout = workout._id;
    this.activities = activities;
  }

  searchCompletedActivities() {
    return SocketService.search('activities', {
      query: { workout: this.workout },
      populate: '',
      sort: { workoutIndex: 1 }
    })
    .then(({ results }) => Promise.resolve(results));
  }

  saveActivities() {
    const activities = _.map(this.activities, activity => _.omit(activity, ['__v']));
    return SocketService.handleEvent('training:save-activities', activities)
    .then(results => {
      console.log('SAVEDACTIVITIES', results);
      return Promise.resolve(results);
    });
  }
}

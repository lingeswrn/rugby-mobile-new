import * as actions from '../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import { Loader } from 'src/lib/components';

export function ensureActivity(ComposedComponent) {
  class EnsureActivity extends Component {
    constructor(props) { super(props); }

    fetchData = () => {
      const {
        queue: { all, processed, enqueuedWorkoutId, isCardio },
        setActivityIndex,
        updateWorkout,
        workout: { current, selectedId }
      } = this.props;
      if (
        isCardio || _.isEmpty(all) || !_.has(all[0], ['model']) ||
        all[0].model.workout !== enqueuedWorkoutId ||
        current.workoutType !== selectedId
      ) {
        return this.props.buildWorkout()
        .then(() => {
        // update the workout if it's not already been started
          return (current.status === 'notStarted') ?
            updateWorkout(current._id, {
              status: 'incomplete',
              startedAt: moment()
            }) : Promise.resolve();
        })
        .then(() => this.props.prepActivities())
        .then(() => setActivityIndex(0));
      }
      // otherwise set the index
      return setActivityIndex(processed.length)
      .then(() => updateWorkout(current._id, { status: 'incomplete' }));
    }

    render() {
      return (
        <Loader
          id='ensureActivity'
          onMount={ this.fetchData }
          title='Processing Activity Data'
          path='/workouts/weightlifting'
        >
          <ComposedComponent { ...this.props } />
        </Loader>
      );
    }
  }

  function mapStateToProps({ user, staticData, training }) {
    const { activity, queue, workout } = training;
    const { data } = user;
    return {
      activity,
      queue,
      staticData,
      workout,
      profile: data.athleteProfile,
      units: data.appConfig.units
    };
  }

  return withRouter(
    connect(mapStateToProps, actions)(EnsureActivity)
  );
}

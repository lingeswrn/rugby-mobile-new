import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Loader } from 'src/lib/components';

export function ensureCardioActivity(ComposedComponent) {
  class EnsureCardioActivity extends Component {
    constructor(props) { super(props); }

    fetchData = async() => {
      await this.props.buildWorkout('ensureCardioActivity');
      const queue = await this.props.prepActivities(true); // isCardio=true
      await this.props.modifyActivity(queue[0].model, {}, 'cardio');
      return Promise.resolve();
    }

    render() {
      return (
        <Loader id='ensureCardioActivity'
          onMount={ this.fetchData }
          title='Building Your Workout'
          path='/workouts/cardio'
        >
          <ComposedComponent { ...this.props } />
        </Loader>
      );
    }
  }

  const mapStateToProps = ({ training, staticData }) => ({
    activity: training.activity,
    profiles: staticData.cardioProfiles,
    templates: staticData.activityTemplates,
    workout: training.workout.current,
    template: training.workout.template
  });

  return connect(mapStateToProps, actions)(EnsureCardioActivity);
}

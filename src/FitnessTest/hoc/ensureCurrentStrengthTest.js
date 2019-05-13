import * as actions from '../actions';
import React, { Component } from 'react';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Loader } from 'src/lib/components';

export function ensureCurrentStrengthTest(ComposedComponent) {
  class HOC extends Component {
    constructor(props) { super(props); }

fetchData = () =>
  this.props.getStaticData()
  .then(this.props.getCurrentStrengthTest)
  .then(this.props.setDefaultActivities)
  .then(() => {
    const {
      completedActivities,
      enqueuedActivities
    } = this.props.strengthTest;
    const template = _.find(completedActivities, {
      muscleGroup: enqueuedActivities[0].model.muscleGroup
    });
    const activityTemplate = _.isUndefined(template)
      ? enqueuedActivities[0].activityTemplates[0]._id
      : template.activityTemplate;
    const muscleGroup = _.isUndefined(template)
      ? enqueuedActivities[0].model.muscleGroup
      : template.muscleGroup;
    return this.props.modifyCurrentActivityModel({
      activityTemplate,
      muscleGroup
    });
  });


render() {
  return (
    <Loader id='ensureCurrentStrengthTest'
      onMount={ this.fetchData }
      title='Building Strength Test'
      path='/strength-test/show'
    >
      <ComposedComponent { ...this.props } />
    </Loader>
  );
}
  }

  function mapStateToProps(state) {
    const { staticData: { muscleGroups }, strengthTest, user } = state;
    const { completedActivities } = strengthTest;
    const currentIndex = completedActivities.length;
    return {
      strengthTest,
      athleteProfile: user.data.athleteProfile,
      units: user.data.appConfig.units,
      currentIndex,
      muscleGroups
    };
  }

  return withRouter(connect(mapStateToProps, actions)(HOC));
}

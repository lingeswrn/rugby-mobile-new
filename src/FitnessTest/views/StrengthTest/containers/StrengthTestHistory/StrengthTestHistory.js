import * as sty from './StrengthTestHistory.style';
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { SceneContainer, Text } from 'src/lib/components';
import { View } from 'native-base';
import { lbToKgModThree } from 'rbv-core/helpers';

export class StrengthTestHistory extends Component {
  handleUnits = lb => {
    return this.props.units === 'metric' ? lbToKgModThree(lb) : lb;
  }

  renderActivities(activities) {
    return _.map(activities, (activity) => {
      const { muscleGroup, weight, reps, oneRepMax } = activity;
      return (
        <View key={ activity._id } style={ sty.row }>
          <Text style={ sty.muscleCol }>{_.upperCase(muscleGroup.name)}</Text>
          <Text style={ sty.col }>{this.handleUnits(weight)}</Text>
          <Text style={ sty.col }>{reps}</Text>
          <Text style={ sty.col }>{this.handleUnits(oneRepMax)}</Text>
        </View>
      );
    });
  }

  renderTest(test) {
    return (
      <View style={ sty.strengthTestItem }>
        <View style={ sty.sectionTitle }>
          <Text h4 style={ sty.title }>{`Strength test completed on ${moment(
            test.completedAt
          ).format('MMM D, YYYY')}`}</Text>
        </View>
        <View style={ sty.titleRow }>
          <Text style={ sty.titleMuscleCol }>MUSCLES</Text>
          <Text style={ sty.titleCol }>WEIGHT</Text>
          <Text style={ sty.titleCol }>REPS</Text>
          <Text style={ sty.titleCol }>1-REP MAX</Text>
        </View>
        {this.renderActivities(test.activities)}
      </View>
    );
  }

  render() {
    const { strengthTests } = this.props;
    return (
      <SceneContainer
        title={ 'Strength Tests' }
        hideSceneFooter
        headerButtons={{
          left: { icon: 'angle-left', to: { pathname: '/fitness-tests', state: { skipFetchData: true }}}
        }}
      >
        {_.isEmpty(strengthTests) ? (
          <Text style={ sty.noTests }>No strength tests to show</Text>
        ) : (
          _.map(strengthTests, (test) => {
            return <View key={ test._id }>{this.renderTest(test)}</View>;
          })
        )}
      </SceneContainer>
    );
  }
}

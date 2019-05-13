import * as sty from './StrengthTestCard.style';

import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { List, ListItem, View, Icon } from 'native-base';
import { Text } from 'src/lib/components';
import { TouchableOpacity } from 'react-native';
import { lbToKgModThree } from 'rbv-core/helpers';

export class StrengthTestCard extends Component {
  constructor(props) {
    super(props);
  }

  handleUnits = lb => {
    return this.props.units === 'metric' ? lbToKgModThree(lb) : lb;
  }

  renderSetsReps({ reps, weight, oneRepMax }) {
    return (
      <View style={ sty.valueWrapper }>
        <View style={ sty.itemContainer }>
          <Text h4>{this.handleUnits(weight)}</Text>
          <Text h6>WEIGHT</Text>
        </View>
        <View style={ sty.repsContainer }>
          <Text h4>{reps}</Text>
          <Text h6>REPS</Text>
        </View>
        <View style={ sty.itemContainer }>
          <Text h4>{this.handleUnits(oneRepMax)}</Text>
          <Text h6>1-REP MAX</Text>
        </View>
      </View>
    );
  }

  renderListItems(activities) {
    if (_.isEmpty(activities)) {
      return (
        <Text style={ sty.noActivities }>No activities to show</Text>
      );
    }
    return _.map(_.compact(activities), (activity, index) => {
      const { activityTemplate } = activity;
      const { name, primaryMuscleGroup } = activityTemplate;
      return (
        <ListItem key={ index } style={ sty.itemWrapper }>
          <View style={ sty.itemContainerLeft }>
            <Text h4>{primaryMuscleGroup.name}</Text>
            <Text style={ sty.secondaryValue }>{name}</Text>
          </View>
          {this.renderSetsReps(activity)}
        </ListItem>
      );
    });
  }

  render() {
    const { activities, completedAt, viewHistory } = this.props;
    return (
      <View>
        <View style={ sty.heading }>
          <Text style={ sty.headingText } h5>
            Strength Test
          </Text>
          <Text style={ sty.headingDate }>{moment(completedAt).fromNow()}</Text>
        </View>
        <TouchableOpacity onPress={ viewHistory } style={ sty.viewHistory }>
          <Text style={ sty.viewHistoryText }>View all strength tests</Text>
          <Icon style={ sty.icon } name='chevron-right' />
        </TouchableOpacity>
        <List>{this.renderListItems(activities)}</List>
      </View>
    );
  }
}

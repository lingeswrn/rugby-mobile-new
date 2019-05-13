import * as sty from './ActivitySummaryList.style';
import React, { Component } from 'react';
import { List, ListItem, View } from 'native-base';
import _ from 'lodash';
import { Text } from 'src/lib/components';

export class ActivitySummaryList extends Component {
  constructor(props) { super(props); }
  renderSetsReps(activity) {
    const { current } = activity;
    const { reps, weight, oneRepMax } = current;
    return (
      <View style={ sty.valueWrapper }>
        <View style={ sty.itemContainer }>
          <Text h4 style={ sty.value }>{ weight }</Text>
          <Text h6 style={ sty.label }>WEIGHT</Text>
        </View>
        <View style={ sty.repsContainer }>
          <Text h4 style={ sty.value }>{ reps }</Text>
          <Text h6 style={ sty.label }>REPS</Text>
        </View>
        <View style={ sty.itemContainer }>
          <Text h4 style={ sty.maxValue }>{ oneRepMax }</Text>
          <Text h6 style={ sty.label }>1-REP MAX</Text>
        </View>
      </View>
    );
  }

  renderListItems(activities) {
    return _.map(activities, (activity, index) => {
      const { activityTemplate, muscleGroup } = activity;
      return (
        <ListItem key={ index } style={ sty.itemWrapper }>
          <View style={ sty.itemContainerLeft }>
            <Text h3>{ muscleGroup.name }</Text>
            <Text style={ sty.secondaryValue }>{ activityTemplate.name }</Text>
          </View>
          { this.renderSetsReps(activity) }
        </ListItem>
      );
    });
  }

  render() {
    const { activities } = this.props;
    return (
      <List style={ sty.card }>
        { this.renderListItems(activities) }
      </List>
    );
  }
}

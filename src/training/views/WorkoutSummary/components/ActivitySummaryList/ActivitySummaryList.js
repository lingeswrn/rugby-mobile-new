import * as sty from './ActivitySummaryList.style';
import React, { Component } from 'react';
import { List, ListItem, View } from 'native-base';
import _ from 'lodash';
import { Text } from 'src/lib/components';

export class ActivitySummaryList extends Component {
  constructor(props) { super(props); }

  renderSetsReps({ scoring = {}}, template) {
    const { complete = 0, target = 0 } = scoring;
    let score = scoring.score || 0;
    if (score) score = _.round((score * 100));

    return (
      <View style={ sty.statsWrapper }>
        <View style={ sty.itemContainer }>
          <Text h5 style={ sty.value }>
            { complete.toString() }
          </Text>
          <Text h5 style={ sty.label }>Total Reps</Text>
        </View>
        <View style={ sty.itemContainer }>
          <Text h5 style={ sty.value }>
            { template.isSuperset ? '--' : target.toString() }</Text>
          <Text h5 style={ sty.label }>Target</Text>
        </View>
        <View style={ sty.itemContainer }>
          <Text h5 style={ sty.value }>
            { template.isSuperset ? '--' : `${score ? score.toString() : '0'}%` }</Text>
          <Text h5 style={ sty.label }>Score</Text>
        </View>
      </View>
    );
  }

  renderListItems(activities) {
    return _.map(activities, (activity, index) => {
      const { template, stats } = activity;
      return (
        <ListItem key={ index } style={ sty.itemWrapper }>
          <View style={ sty.itemContainerLeft }>
            <Text h6 style={ sty.value }>{ template.activity.name }</Text>
          </View>
          { this.renderSetsReps(stats, template) }
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

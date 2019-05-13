import * as sty from './ActivityCompareList.style';
import React, { Component } from 'react';
import _ from 'lodash';
import { List, ListItem, View } from 'native-base';
import { Text } from 'src/lib/components';

export class ActivityCompareList extends Component {
  constructor(props) { super(props); }

  renderSetsReps(activity) {
    const { current } = activity;
    const { oneRepMax } = current;
    const oldMax = activity.previous ? activity.previous.oneRepMax : '-';
    const diff = _.round(((oneRepMax - oldMax) / oldMax) * 100, 1);
    const changeSymbol = diff > 0 ? '+' :  '';
    const maxStyle = diff > 0 ? sty.maxValueUp : sty.maxValueDown;
    const maxLabel = diff > 0 ? sty.maxLabelUp : sty.maxLabelDown;
    const percent = _.isNumber(diff) ? `${changeSymbol}${diff}%` : '--';
    return (
      <View style={ sty.valueWrapper }>
        <View style={ sty.itemContainer }>
          <Text h4 style={ sty.valuePrev }>{ oldMax }</Text>
          <Text h6 style={ sty.labelPrev }>Last Time</Text>
        </View>
        <View style={ sty.itemContainer }>
          <Text h4 style={ sty.value }>{ oneRepMax }</Text>
          <Text h6 style={ sty.label }>This Time</Text>
        </View>
        <View style={ sty.itemContainer }>
          <Text h4 style={ maxStyle }>{ percent }</Text>
          <Text h6 style={ maxLabel }>CHANGE</Text>
        </View>
      </View>
    );
  }

  renderListItems(activities) {
    return activities.map((activity, index) => {
      const { activityTemplate, muscleGroup } = activity;
      return (
        <ListItem key={ index } style={ sty.itemWrapper }>
          <View style={ sty.itemContainerLeft }>
            <Text h3 style={ sty.value }>{ muscleGroup.name }</Text>
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

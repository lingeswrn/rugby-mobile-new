import _ from 'lodash';
import * as sty from './ItemWrapper.style';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';

export class ItemWrapper extends Component {
  constructor(props) {
    super(props);
  }

  getDuration(weightTemplates, cardioTemplates) {
    let numSets = 0;
    _.map(weightTemplates, (t) => {
      numSets += t.reps ? t.reps.length : t.sets;
      7;
    });
    const cardioTime = _.isEmpty(cardioTemplates)
      ? 0
      : cardioTemplates[0].time + 10;
    return {
      total: numSets + numSets * 1.5 + cardioTime,
      weights: numSets + numSets * 1.5,
      cardio: cardioTime
    };
  }

  renderItemData(day) {
    const { isOpen, nutrition } = this.props;
    const { dayName, metadata, template } = day;
    const {
      weightliftingActivityTemplates,
      cardioActivityTemplates
    } = template;
    const duration = this.getDuration(
      weightliftingActivityTemplates, cardioActivityTemplates
    );
    const activityCount =
      weightliftingActivityTemplates.length + cardioActivityTemplates.length;
    const style = sty.workoutData(metadata);
    return (
      <View style={ sty.dataWrapper(isOpen) }>
        <View style={ sty.dayWrapper }>
          <Text h5 style={ style.dayLabel }>
            {metadata.isCurrent ? 'today' : dayName}
          </Text>
        </View>
        {metadata.workoutCategory === 'gameday' ? (
          <View style={ sty.metricWrapper }>
            <Text h4 style={ style.valueRight }>
              {'gameday'}
            </Text>
          </View>
        ) : (
          <View style={ sty.dataContainer }>
            <View style={ sty.metricWrapper }>
              <Text h4 style={ style.value }>
                {activityCount.toString()}
              </Text>
              <Text h6 style={ style.label }>
                Activities
              </Text>
            </View>
            <View style={ sty.metricWrapper }>
              <Text h4 style={ style.value }>
                {duration.total.toString()}
              </Text>
              <Text h6 style={ style.label }>
                {'Minutes'}
              </Text>
            </View>
            <View style={ sty.metricWrapper }>
              <Text h4 style={ style.value }>
                {nutrition.getActivityCalories(duration.weights, 'weightlifting') +
                  nutrition.getActivityCalories(duration.cardio, 'run', 'aerobic')}
              </Text>
              <Text h6 style={ style.label }>
                Calories
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  render() {
    const { children, day, isOpen, _onPress } = this.props;
    return (
      <View style={ sty.wrapper }>
        <TouchableOpacity onPress={ _onPress } style={ sty.container(isOpen) }>
          {this.renderItemData(day)}
        </TouchableOpacity>
        {children}
      </View>
    );
  }
}

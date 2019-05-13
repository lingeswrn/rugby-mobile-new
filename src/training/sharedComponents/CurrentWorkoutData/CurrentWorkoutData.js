import * as sty from './CurrentWorkoutData.style';
import * as actions from 'src/training/actions';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'native-base';
import { StartButton } from './StartButton';
import { getItemStatus } from './utils';
import { Text } from 'src/lib/components/Text';
import { NutritionService } from 'rbv-core/services/Rugbyvault/NutritionService';

class _CurrentWorkoutData extends Component {
  constructor(props) {
    super(props);
    this.nutrition = NutritionService(props.user.data);
    this.state = { itemStatus: getItemStatus(props) };
    this.category = props.metadata.workoutCategory;
  }

  renderActivityItem(workout, template) {
    if (this.category === 'gameday') {
      return (
        <View style={ sty.matchDetailsPlaceholder }>
          { this.renderActivityDataList([
            { title: 'no fixture data available' }
          ], sty.segmentItem('weightlifting', this.state.itemStatus)) }
        </View>
      );
    }
    return (
      <View
        style={ sty.segmentItem('cardio', this.state.itemStatus).cardContainer }
      >
        { this.renderActivityData(workout, template, 'cardio') }
        { this.renderActivityData(workout, template, 'weightlifting') }
      </View>
    );
  }

  getDuration(templates) {
    let numSets = 0;
    _.map(templates, (t) => {
      numSets += t.reps ? t.reps.length : t.sets; 7;
    });
    return (_.round(numSets + (numSets * 1.5)));
  }

  getActivityData(workout, template, type) {
    const { cardioDuration, cardioStatus, status } = workout;
    const duration = this.getDuration(template.weightliftingActivityTemplates);
    const templateDuration = template.cardioActivityTemplates[0]
      ? template.cardioActivityTemplates[0].time + 10
      : 30;
    if (type === 'cardio') {
      return {
        activityCount: cardioStatus === 'complete' ? 'run' : '1',
        activityLabel: cardioStatus === 'complete' ? 'activity' : 'activities',
        calories: this.nutrition.getActivityCalories(30, 'run', 'aerobic'),
        caloriesLabel: cardioStatus === 'complete' ? 'calories' : 'est. calories',
        duration: cardioStatus === 'complete'
          ? _.round(cardioDuration / 60)
          : templateDuration,
        durationLabel: cardioStatus === 'complete' ? 'duration' : 'est. duration',
        label: 'cardio',
        workoutType: workout.workoutType
          ? workout.workoutType
          : template.workoutType
      };
    }
    return {
      activityCount: template.weightliftingActivityTemplates.length.toString(),
      activityLabel: 'activities',
      calories: this.nutrition.getActivityCalories(
        duration, 'weightlifting'
      ).toString(),
      caloriesLabel: status === 'complete' ? 'calories' : 'est. calories',
      duration,
      durationLabel: status === 'complete' ? 'duration' : 'est. duration',
      label: 'lifting',
      workoutType: workout.workoutType
        ? workout.workoutType
        : template.workoutType
    };
  }

  renderActivityDataList(items, style) {
    return _.map(items, ({ label, title, value }, index) => {
      if (title) {
        return <Text h4 key={ index } style={ sty.title }>{ title }</Text>;
      } return (
        <View key={ index } style={ style.container }>
          <Text h5 style={ style.label }>{ label }</Text>
          <Text h4 style={ style.value }>{ value }</Text>
        </View>
      );
    });
  }

  renderActivityData(workout, template, type) {
    const { metadata } = this.props;
    const { itemStatus } = this.state;
    const {
      activityCount, activityLabel,
      calories, caloriesLabel,
      duration, durationLabel, label, workoutType
    } = this.getActivityData(workout, template, type);

    const style = sty.segmentItem(type, itemStatus);
    if (
      (type === 'weightlifting' &&
        _.isEmpty(template.weightliftingActivityTemplates)) ||
      (type === 'cardio' && _.isEmpty(template.cardioActivityTemplates))
    ) {
      return (
        <View style={ style.zeroDataWrapper }>
          <Text h1 style={ sty.zeroDataTitle }>
            {label}
          </Text>
          <View style={ sty.zeroDataContainer }>
            <Text h3 style={ sty.zeroDataTitle }>
              {'REST DAY'}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={ style.wrapper }>
        <Text h1 style={ style.title }>{ label }</Text>
        { this.renderActivityDataList([
          { label: activityLabel, value: activityCount },
          { label: durationLabel, value: duration },
          { label: caloriesLabel, value: calories },
        ], style)}
        <StartButton
          workout={ workout }
          workoutType={ workoutType }
          setSelectedWorkoutType={ this.props.setSelectedWorkoutType }
          type={ type }
          startSegment={ this.props.selectWorkoutSegment }
          itemStatus={ itemStatus }
          metadata={ metadata }
        />
      </View>
    );
  }

  render() {
    const { template, model } = this.props;
    return (
      <View style={ sty.cardWrapper }>
        { this.renderActivityItem(model, template) }
      </View>
    );
  }
}

export const CurrentWorkoutData = connect(null, actions)(_CurrentWorkoutData);

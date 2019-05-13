import * as sty from './HydrationTarget.style';

import React, { Component } from 'react';
import numeral from 'numeral';
import _ from 'lodash';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';

export class HydrationTarget extends Component {
  constructor(props) {
    super(props);
  }
  get currentSchedule() {
    return this.props.schedule.getCurrentDaySchedule();
  }
  get currentDay() {
    return this.currentSchedule.metadata.workoutType;
  }

  getWorkoutDuration() {
    let numSets = 0;
    _.map(this.currentSchedule.template.weightliftingActivityTemplates, t => {
      numSets += t.reps ? t.reps.length : t.sets;
      7;
    });
    return numSets + numSets * 1.5;
  }

  getCardioDuration() {
    const { thisWeek } = this.props;
    const workout = _.find(thisWeek, { workoutType: this.currentDay });
    return workout ? (workout.cardioDuration / 60) : 30;
  }

  getHydrationAmount() {
    const weight = this.props.weight;
    const cardioTime = this.getCardioDuration();
    const workoutTime = this.getWorkoutDuration();
    const litersAfterExercise = ((workoutTime + cardioTime) / 60) || 0;
    const litersWithoutExercise = weight * 0.05;
    // rounds to the nearest 0.5
    return numeral(litersWithoutExercise + litersAfterExercise).format('0.0');
  }

  render() {
    const hydrationAmout = this.getHydrationAmount();
    return (
      <View style={ sty.hydrationContainer }>
        <Text style={ sty.hydrationTarget } h1>
          Hydration Target
        </Text>
        <Text style={ sty.liters } h1>
          {hydrationAmout} Liters
        </Text>
      </View>
    );
  }
}

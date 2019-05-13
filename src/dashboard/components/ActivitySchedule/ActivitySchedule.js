import * as sty from './ActivitySchedule.style';

import React, { Component } from 'react';
import _ from 'lodash';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';
import { CurrentWorkoutData } from 'src/training/sharedComponents';
import { InjuryBanner } from './subComponents';

export class ActivitySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get currentSchedule() { return this.props.schedule.getCurrentDaySchedule(); }
  get currentDay() { return this.currentSchedule.metadata.workoutType; }

  render() {
    const { selectWorkoutSegment, user, workout: { thisWeek }} = this.props;
    return (
      <View style={ sty.wrapper }>
        <View style={ sty.titleWrapper }>
          <Text h3 inverse>
            { this.currentSchedule.metadata.workoutCategory === 'gameday' ?
              'fixture details' : 'activity schedule'
            }
          </Text>
        </View>
        <InjuryBanner { ...this.currentSchedule } />
        <CurrentWorkoutData { ...this.currentSchedule }
          model={ _.find(thisWeek, { workoutType: this.currentDay }) || {} }
          user={ user }
          startSegment={ selectWorkoutSegment }
        />
      </View>
    );
  }
}

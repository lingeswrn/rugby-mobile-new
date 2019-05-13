import * as sty from './Dashboard.style';
import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { syncData } from '../hoc';
import { View } from 'native-base';
import { SceneContainer } from 'src/lib/components';
import { Text } from 'src/lib/components/Text';
import {
  ActivitySchedule, MatchDayBanner, NutritionSummary, TaskList
} from '../components';
import { WorkoutSchedule } from 'rbv-core/services/Rugbyvault/Training/WorkoutService';

class _Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.days = ['today'];
    this.state = { refreshing: false };
  }

  get schedule() {
    const { injuries, training, user } = this.props;
    return new WorkoutSchedule(training.weeklyRoutine, user, injuries);
  }

  get currentDay() { return this.schedule.getCurrentDaySchedule(); }
  handleRefresh = () => {
    this.setState({ refreshing: true });
    return this.props.refreshData()
    .then(() => this.setState({ refreshing: false }));
  }

  render() {
    const {
      training: { workout, workout: { thisWeek }}, dailyLogs, user
    } = this.props;
    const { metadata } = this.currentDay;
    return (
      <SceneContainer
        headerButtons={{ left: 'empty' }}
        title='Dashboard'
        subtitle={ moment().format('DD MMMM, YYYY') }
        handleRefresh={ this.handleRefresh }
        refreshTitle={ 'Syncing...' }
      >
        <View style={ sty.cardWrapper }>
          <View style={ sty.titleWrapper }>
            <Text h1 inverse>{`today  |  ${metadata.workoutCategory}`}</Text>
          </View>
          <MatchDayBanner daysUntilGameday={ this.schedule.daysUntilGameday } />
          <TaskList { ...this.currentDay }
            workout={
              _.find(thisWeek, { workoutType: metadata.workoutType }) || {}
            }
            dailyLog={ dailyLogs.current }
          />
          <ActivitySchedule user={ user }
            workout={{ ..._.omit(workout, ['current']), model: workout.current }}
            schedule={ this.schedule }
          />
          <NutritionSummary user={ user }
            workout={{ ..._.omit(workout, ['current']), model: workout.current }}
            schedule={ this.schedule }
          />
        </View>
      </SceneContainer>
    );
  }
}

export const Dashboard = syncData(_Dashboard);

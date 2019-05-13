// import * as actions from 'src/training/actions';
// import * as sty from './WorkoutList.style';

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { View } from 'native-base';
import { SceneContainer } from 'src/lib/components';
import { UpcomingSchedule } from '../components';
import { WorkoutSchedule } from 'rbv-core/services/Rugbyvault/Training/WorkoutService';
import { NutritionService } from 'rbv-core/services/Rugbyvault/NutritionService';

class _WorkoutList extends Component {
  constructor(props) {
    super(props);
    const { injuries, training: { weeklyRoutine }, user } = props;
    this.schedule = new WorkoutSchedule(weeklyRoutine, user, injuries);
    this.nutrition = new NutritionService(user.data);
  }

  componentWillMount() {
    const {
      training: {
        trainingPlan: { current },
        weeklyRoutine: { template }
      }
    } = this.props;

    if (_.isEmpty(current) || _.isEmpty(template)) {
      this.props.history.replace({
        pathname: '/strength-test/introduction',
        state: { showRedirectAlert: true }
      });
    }
  }

  render() {
    const {
      setSelectedWorkoutType,
      training: {
        trainingPlan: { current },
        workout: { selectedId, thisWeek },
        weeklyRoutine: { template, current: { weekOfPlan }}
      },
      user
    } = this.props;

    if (_.isEmpty(current) || _.isEmpty(template)) return null;

    return (
      <SceneContainer title='Training Plan'
        subtitle={ weekOfPlan ? `Week ${weekOfPlan}` : null }
        headerButtons={{
          left: { icon: 'angle-left', to: '/' }
        }}
      >
        <View>
          <UpcomingSchedule
            workouts={ thisWeek }
            open={ selectedId }
            setSelectedWorkoutType={ setSelectedWorkoutType }
            schedule={ this.schedule }
            nutrition={ this.nutrition }
            user={ user }
          />
        </View>
      </SceneContainer>
    );
  }
}

export const WorkoutList = withRouter(_WorkoutList);

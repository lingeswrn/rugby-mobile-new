import * as sty from './UpcomingSchedule.style';
import React, { Component } from 'react';
import _ from 'lodash';

import Collapsible from 'react-native-collapsible';
import { CurrentWorkoutData } from 'src/training/sharedComponents';
import { List } from 'native-base';
import { ItemWrapper } from './subComponents';

export class UpcomingSchedule extends Component {
  constructor(props) {
    super(props);
  }

  renderListItems() {
    const { schedule, open, user, workouts } = this.props;
    return _.map(_.sortBy(schedule.getWeeklySchedule(), 'relativeIndex'),
      (day, index) => {
        const { metadata: { workoutType }, relativeIndex } = day;
        const workout = _.find(workouts, { workoutType }) || {};
        return (
          <ItemWrapper key={ index }
            day={ day }
            isOpen={ open }
            _onPress={ () => this.props.setSelectedWorkoutType(relativeIndex) }
            nutrition={ this.props.nutrition }
          >
            <Collapsible collapsed={ open !== relativeIndex }>
              <CurrentWorkoutData { ...day }
                model={ workout }
                user={ user }
              />
            </Collapsible>
          </ItemWrapper>
        );
      });
  }

  render() {
    return (
      <List style={ sty.wrapper }>{ this.renderListItems() }</List>
    );
  }
}

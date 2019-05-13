import * as sty from './TaskList.style';

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { TouchableOpacity } from 'react-native';

import { AnimatedGaugeProgress as Gauge } from 'react-native-simple-gauge';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';
import _ from 'lodash';

export class _TaskList extends Component {
  constructor(props) { super(props); this.state = { fill: 0 }; }

  getPoints(val) {
    switch(val) {
      case 'incomplete': return 1;
      case 'complete': return 3;
      default: return 0;
    }
  }

  getDailyLogStatus() {
    const { dailyLog } = this.props;
    const logProps = ['caloriesIn', 'weight', 'sleepDuration'];
    let status = 'notStarted';
    const points = _.filter(_.pick(dailyLog, logProps), _.isNumber).length;
    switch(points) {
      case 1: case 2: status = 'incomplete'; break;
      case 3: status = 'complete'; break;
      default: break;
    }
    return { dailyLogStatus: status, dailyLogPoints: points };
  }

  getStatuses() {
    const {
      workout: { cardioStatus, status },
      hasWeights,
      hasCardio
    } = this.props;
    const dailyLogStatus = this.getDailyLogStatus();
    const cardioPoints = this.getPoints(cardioStatus);
    const liftingPoints = this.getPoints(status);
    const points = [liftingPoints, cardioPoints, dailyLogStatus.dailyLogPoints];
    const possiblePoints = () => {
      if ((!hasWeights && hasCardio) || (hasWeights && !hasCardio)) return 6;
      if (!hasWeights && !hasCardio) return 3;
      return 9;
    };
    this.setState({
      cardioPoints,
      cardioStatus,
      fill: _.round((_.sum(points) / possiblePoints()) * 100),
      liftingPoints,
      liftingStatus: status,
      ...dailyLogStatus
    });
  }

  componentWillMount() { this.getStatuses(); }

  getGaugeText = (fill) => (
    <View style={ sty.gaugeTextWrapper(_.round(fill, 0)) }>
      <Text h1 style={ sty.gaugeText }>{ `${_.round(fill, 0)}%`}</Text>
    </View>
  );

  renderListItems(items) {
    return _.map(items, ({ disabled, label, status, to, skip }, index) => {
      if (skip) return null;
      return (
        <TouchableOpacity key={ index }
          onPress={ () => this.props.history.push(to) }
          disabled={ disabled }
        >
          <Text h2 style={ sty.listItem(status, disabled) }>{ label }</Text>
        </TouchableOpacity>
      );
    });
  }
  render() {
    const {
      hasWeights,
      hasCardio,
      injuryLimits,
      workout
    } = this.props;
    const { dailyLogStatus } = this.state;
    return (
      <View style={ sty.wrapper }>
        <View style={ sty.gaugeWrapper }>
          <Text h2 style={ sty.progress }>{ 'Progress' }</Text>
          <Gauge { ...sty.gaugeProps(this.state.fill) }>
            { this.getGaugeText }
          </Gauge>
        </View>
        <View style={ sty.listWrapper }>
          { this.renderListItems([
            { label: 'cardio',
              status: workout.cardioStatus,
              to: '/workouts/cardio',
              skip: !hasCardio,
              disabled: !injuryLimits.cardio
            }, {
              label: 'lifting',
              status: workout.status,
              to: '/workouts/weightlifting',
              skip: !hasWeights,
              disabled: !injuryLimits.weightlifting
            }, {
              label: 'daily log',
              status: dailyLogStatus,
              to: '/daily-log'
            }
          ]) }
        </View>
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      !_.isMatch(nextProps.dailyLog, this.props.dailyLog) ||
      !_.isMatch(nextProps.workout, this.props.workout)
    ) this.getStatuses();
  }
}

export const TaskList = withRouter(_TaskList);

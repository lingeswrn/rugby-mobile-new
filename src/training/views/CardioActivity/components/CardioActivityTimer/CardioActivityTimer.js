import * as sty from './CardioActivityTimer.style';
import React, { Component } from 'react';
import { has as _has } from 'lodash';
// import numeral from 'numeral';
import moment from 'moment';
import 'moment-duration-format';
import { View } from 'native-base';
import { Text, Button } from 'src/lib/components';
import { SegmentBar } from '../SegmentBar';
/**
 * props: initialValue (number, seconds)
 * onCancel: function
 */

export class CardioActivityTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segmentTimerValue: _has(props.activeSegment, 'durationSeconds') ?
        props.activeSegment.durationSeconds : 90,
      // segmentTimerValue: 10,
      workoutTimerValue: props.initialWorkoutValue || 90,
      running: false,
      updating: false
    };
  }

  handleStart() {
    this.setState({ running: true });
    this._timer = setInterval(() => {
      this.setState({
        segmentTimerValue: this.state.segmentTimerValue - 1,
        workoutTimerValue: this.state.workoutTimerValue - 1
      });
    }, 1000);
  }

  handlePause() {
    this.setState({ running: false });
    clearInterval(this._timer);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  componentWillReceiveProps(nextProps) {
    const {
      activeSegment: { durationSeconds, startTime },
      activeSegmentIndex
    } = nextProps;
    if (activeSegmentIndex !== this.props.activeSegmentIndex) {
      this.setState({
        segmentTimerValue: durationSeconds,
        workoutTimerValue: this.props.initialWorkoutValue - startTime,
        updating: false
      });
    }
  }

  componentWillUpdate() {
    const { onEndSegment } = this.props;
    if (this.state.segmentTimerValue === 1 && this.state.updating === false) {
      this.setState({ updating: true });
      onEndSegment();
    }
  }

  render() {
    const { segmentTimerValue, workoutTimerValue, running } = this.state;
    const {
      activeSegment,
      /* onCancel, */
      format = 'mm:ss',
      initialWorkoutValue,
      totalSegments
    } = this.props;

    if (workoutTimerValue > 0) {
      return (
        <View style={ sty.wrapper }>
          <SegmentBar
            timerValue={
              `${moment.duration(segmentTimerValue, 'seconds').format(format, { trim: false })}`
            }
            segment={ activeSegment }
            totalSegments={ totalSegments }
          />
          <View style={ sty.timerContainer }>
            <Text h1 style={ sty.timer }>
              {
                `${moment.duration(workoutTimerValue, 'seconds').format(format, { trim: false })}`
              }
            </Text>
          </View>
          <View style={ sty.buttonWrapper }>
            <Button
              style={ sty.button }
              onPress={ running ?
                () => this.handlePause() :
                () => this.handleStart()
              }
              success={ !running && workoutTimerValue === initialWorkoutValue }
              warning={ !running && workoutTimerValue !== initialWorkoutValue }
              label={ running ? 'PAUSE' : workoutTimerValue === initialWorkoutValue ?
                'START' : 'RESUME' }
            />
          </View>
        </View>
      );
    }
    return null;
  }
}

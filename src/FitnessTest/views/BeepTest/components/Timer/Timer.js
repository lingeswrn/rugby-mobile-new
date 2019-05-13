import * as sty from './Timer.style';
import React, { Component } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import { Button, Text } from 'src/lib/components';
import { View } from 'react-native';

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuttleCount: 1,
      level: 1,
      // shuttleTime is calculated for each level and stored here
      shuttleTime: 9,
      // timerValue keeps track of the shuttle duration
      timerValue: 9,
      shuttlesPerLevel: 7
    };
  }

  // all of the functions combined
  onIntervalComplete = () => {
    // IF all of the shuttles on the level are completed
    if (this.state.shuttleCount === this.state.shuttlesPerLevel) {
      // IF the final level is completed -- (you probably broke a world record)
      if (this.state.level === 21) {
        return this.props.onStop(this.state.level, this.state.shuttleCount);
      }
      // go to the next level
      return this.increaseLevel();
    }
    // just increase the shuttle count
    return this.increaseShuttleCount();
  };

  // increases the level, calculates shuttleTime and shuttlesPerLevel
  // and resets the shuttleCount
  increaseLevel = () => {
    this.props.LevelBeep.play();
    const nxtLvl = this.state.level + 1;
    // speed run for the duration the level (meters per second)
    const speed =
      nxtLvl === 1 ? (8 * 5) / 18 : ((8.5 + 0.5 * (nxtLvl - 1)) * 5) / 18;
    // distance run over the entire level (meters) FUN MATH
    const levelDistance = speed * 60 + 20 - ((speed * 60) % 20);
    // the number of shuttles in the level
    const shuttlesPerLevel = levelDistance / 20;
    // time it should take to run one shuttle (seconds)
    const shuttleTime = levelDistance / speed / shuttlesPerLevel;
    return this.setState({
      level: nxtLvl,
      shuttleTime,
      shuttlesPerLevel,
      shuttleCount: 1
    });
  };

  // just increases the current level's shuttleCount by 1
  increaseShuttleCount = () => {
    this.props.ShuttleBeep.play();
    this.setState({ shuttleCount: this.state.shuttleCount + 1 });
  };

  componentDidMount() {
    this._timer = setInterval(() => {
      if (!this.props.timerOpen) clearInterval(this._timer);
      if (this.state.timerValue < 0.1) {
        this.onIntervalComplete();
        return this.setState({ timerValue: this.state.shuttleTime });
      }
      return this.setState({ timerValue: this.state.timerValue - 0.1 });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  stopButton = () => {
    clearInterval(this._timer);
    this.props.onStop(this.state.level, this.state.shuttleCount);
  };

  render() {
    const { timerValue } = this.state;
    return (
      <View style={ sty.container }>
        <View style={ sty.levelShuttleContainer }>
          <Text h4 style={ sty.level }>{`Level ${this.state.level}`}</Text>
          <Text h4 style={ sty.shuttle }>{`Shuttle ${
            this.state.shuttleCount
          }`}</Text>
        </View>
        <View style={ sty.timerContainer }>
          <View style={ sty.timerBox }>
            <Text style={ sty.timerText }>
              {moment(timerValue * 1000).format('mm:ss.SS')}
            </Text>
          </View>
          <Button
            light
            style={ sty.timerButton }
            label='stop'
            onPress={ this.stopButton }
          />
        </View>
      </View>
    );
  }
}

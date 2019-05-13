import * as sty from './Timer.style';
import React, { Component } from 'react';
// import { round as _round } from 'lodash';
// import numeral from 'numeral';
import moment from 'moment';
import 'moment-duration-format';
import { View, Text, /* Button, Icon */ } from 'native-base';

/**
 * props: initialValue (number, seconds)
 * onCancel: function
 */

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerValue: props.initialValue || 90
    };
  }
  componentDidMount() {
    this._timer = setInterval(() => {
      this.setState({ timerValue: this.state.timerValue - 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  componentWillUpdate() {
    if (this.state.timerValue <= 0) this.props.onCancel();
  }

  render() {
    const { timerValue } = this.state;
    const { /* onCancel, */ format = 'mm:ss' } = this.props;

    if (timerValue > 0) {
      return (
        <View
          style={ sty.timerContainer }>
          <Text style={ sty.timer }>
            { `${moment.duration(timerValue, 'seconds').format(format)}` }
          </Text>
        </View>
      );
    }
    return null;
  }
}

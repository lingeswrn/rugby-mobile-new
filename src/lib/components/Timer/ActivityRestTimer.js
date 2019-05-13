import * as sty from './Timer.style';
import React, { Component } from 'react';
// import { round as _round } from 'lodash';
import { View, Text, Button, Icon } from 'native-base';
import moment from 'moment';
import 'moment-duration-format';

/**
 * props: initialValue (number, seconds)
 * onCancel: function
 */

export class ActivityRestTimer extends Component {
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
    const { onCancel } = this.props;

    if (timerValue > 0) {
      return (
        <View
          style={ sty.wrapper }>

          <View
            style={ sty.timerContainer }>
            <Text style={ sty.timer }>
              { `${moment.duration(timerValue, 'seconds').format('m:ss', { trim: false })}`}
            </Text>
          </View>
          <Button
            bordered
            iconRight
            light
            style={ sty.skipButton }
            onPress={ onCancel }
          >
            <View style={ sty.timerButton }>
              <Text style={ sty.label }>
                { 'SKIP  ' }
              </Text>
              <Icon
                style={ sty.icon }
                name='angle-right'
              />
            </View>
          </Button>
        </View>
      );
    }
    return null;
  }
}


// export class Timer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showMsg: false
//     };
//   }
//
//   componentWillUnmount() {
//     timer.clearTimeout(this);
//   }
//
//   showMsg() {
//     this.setState({ showMsg: true }, () => timer.setTimeout(
//       this, 'hideMsg', () => this.setState({ showMsg: false }), 2000
//     ));
//   }
//
//   render() {
//     return (
//       <View style={ { flex: 1 } }>
//         <TouchableOpacity
//           onPress={ () => requestAnimationFrame(() => this.showMsg()) }
//         >
//           <Text>Press Me</Text>
//         </TouchableOpacity>
//
//         {this.state.showMsg ? (
//           <Text>Hello!!</Text>
//         ) : (
//           null
//         )}
//       </View>
//     );
//   }
// }

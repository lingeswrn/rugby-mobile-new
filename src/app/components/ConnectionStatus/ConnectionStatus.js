import * as sty from './ConnectionStatus.style';
import * as actions from '../../actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'native-base';
import { /* Button,  */Text } from 'src/lib/components';
import numeral from 'numeral';

class _ConnectionStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, timerVal: 1 };
    this._timer = null;
  }

  startTimer = () => {
    this._timer = setInterval(() => {
      if (this.state.timerVal <= 1) this.clearTimer();
      else this.setState({ running: true, timerVal: this.state.timerVal - 1 });
    }, 1000);
  }
  clearTimer() {
    this.setState({ running: false, timerVal: 0 });
    clearInterval(this._timer);
  }

  componentWillReceiveProps(nextProps) {
    const { connected, connecting, delay } = nextProps;
    /* if the timer is about to start running while the old one is still
     * running, clear the interval and start over
     */

    if (
      (connecting && !this.props.connecting) &&
      this.state.running
    ) this.clearTimer();


    if (!connected && (delay > this.props.delay)) {
      this.setState({ timerVal: delay }, this.startTimer);
    }
    /* when the socket connects; clear the timer */
    if (connected && !this.props.connected) this.clearTimer();
  }

  componentWillUnmount() { this.clearTimer(); }
  render() {
    if (this.props.connected) return this.props.children;
    return (
      <View style={ sty.wrapper }>
        { this.props.children }
        <View style={ sty.container }>
          <View style={ sty.textWrapper }>
            { this.Message }
          </View>
          {/* { this.RetryButton } */}
        </View>
      </View>
    );
  }

  /* COMPONENTS */
  get Message() {
    const { timerVal } = this.state;
    const { connected, connecting, delay, disconnectSource } = this.props;
    const toDisplay = timerVal ? `in :${numeral(timerVal).format('00')}` : 'momentarily';
    let text = 'Running in offline mode.';
    switch(true) {
      case connecting: text = 'Connecting...'; break;
      case disconnectSource === 'device':
        text = 'Device has insufficient signal. Running in offline mode.';
        break;
      case !connected && delay >= 64: break;
      case disconnectSource === 'server':
        text = `Cannot connect to Rugbvault HQ; retrying ${toDisplay}`;
        break;
      default: break;
    }
    return <Text style={ sty.text }>{ text }</Text>;
  }

  /* removed for now; might re-add later */
  // get RetryButton() {
  //   if (this.props.disconnectSource === 'server') {
  //     return (
  //       <View style={ sty.retryButtonWrapper }>
  //         <Button large={ false }
  //           transparent
  //           labelStyle={ sty.retryLabel }
  //           label={ 'retry now' }
  //           onPress={ this.props.forceReconnectAttempt }
  //         />
  //       </View>
  //     );
  //   } return null;
  // }
}

export const ConnectionStatus = connect(
  ({ connection }) => connection,
  actions
)(_ConnectionStatus);

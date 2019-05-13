import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectRealtimeService } from 'src/lib/services/realtime';
import { Loader } from 'src/lib/components';

export function connectRealtime(ComposedComponent) {
  class HOC extends Component {
    constructor(props) {
      super(props);
      this._RTS = props.connectRealtimeService();
      this.state = { complete: false };
    }

    async componentDidMount() {
      if (!_.isEmpty(this.props.realtime.account)) {
        return this.setState({ complete: true });
      }
      const account = await this._RTS.getAccount();
      if (!account) {
        await this._RTS.createAccount();
        return this.setState({ complete: true });
      }
      return this.setState({ complete: true });
    }

    render() {
      if (!this.state.complete) return <Loader title='loading conversations'/>;
      return <ComposedComponent { ...this.props } />;
    }
  }

  return connect(
    ({ realtime, user }) => ({ realtime, user: user.data }),
    { connectRealtimeService }
  )(HOC);
}

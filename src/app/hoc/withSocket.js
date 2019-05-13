import * as acctActions from 'src/account/actions';
import * as actions from '../actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SocketService } from 'rbv-core/services/SocketService/SocketService';

export function withSocket(ComposedComponent) {
  class HOC extends Component {
    constructor(props) {
      super(props);
      this._socket = null;
    }

    componentWillMount() { this.getSocket(); }

    getSocket() {
      const socket = SocketService.socket;
      if (!this._socket) this._socket = socket;
      socket
      /* CONNECT EVENTS */
      .on('connect', () => {
        // console.log('connect');
        this.props.updateConnectionStatus(true);
      })
      .on('reconnect', () => {
        // Fired upon a successful reconnection.
        // console.log('reconnect');
        this.props.updateConnectionStatus(true);
      })

      /* RECONNECT EVENTS */
      .on('reconnect_attempt', (/* count */) => {
        // Fired upon an attempt to reconnect.
        // console.log(`reconnect attempt ${count}`);
      })
      .on('reconnecting', (count) => {
        // console.log('connection @ reconnecting: ', this.props.connection);
        // fires at the beginning of a reconnection attempt
        this.props.updateConnectingStatus(true, count);
        // console.log('reconnecting', count);
      })

      /* DISCONNECT EVENT */
      .on('disconnect', () => {
        // console.log('disconnect');
        this.props.updateConnectionStatus(false);
      })
      .on('connect_timeout', () => {
        // Fired upon a connection timeout.
        // console.log('connect_TIMEOUT');
      })

      /* ERRORS */
      .on('connect_error', (/* error */) => {
        // Fired upon a connection error.
        console.log('connect_error');
        // console.log('connection @ connect_error: ', this.props.connection);
        if (this.props.connection.connected) {
          this.props.updateConnectionStatus(false);
        }
      })
      .on('reconnect_error', (/* error */) => {
        // Fires upon failed reconnection attempt.
        // console.log('reconnect_error');
        // console.log('connection @ reconnect_error: ', this.props.connection);
        this.props.updateConnectingStatus(false);
      })

      .open();
      return socket;
    }

    render() {
      return <ComposedComponent { ...this.props } />;
    }
  }

  return connect((state) => state, { ...acctActions, ...actions })(HOC);
}

import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { AppRoutes } from './AppRoutes';
import { history } from 'src/_store/history';


export class NativeRouter extends Component {
  constructor(props) {
    super(props);
    this.state = { History: history };
  }

  render() {
    const { History } = this.state;
    return (
      <ConnectedRouter history={ History }>
        <AppRoutes />
      </ConnectedRouter>
    );
  }
}

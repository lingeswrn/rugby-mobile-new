import * as actions from 'src/dashboard/actions';

import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Loader } from 'src/lib/components/Loader';

export function syncData(ComposedComponent) {
  class HOC extends Component {
    constructor(props) {
      super(props);
      const today = moment().format('YYYY-MM-DD');
      const { lastSync } = props.dashboard;
      this.state = {
        // bypass: false
        bypass: lastSync && moment(lastSync).isSame(today, 'day')
      };
    }

    componentDidMount() {
      const { userSubscription, groupSubscription } = this.props;
      if (!userSubscription && !groupSubscription) {
        this.props.history.push('/account/no-subscription');
      }
    }

    sync = () => this.props.syncData(this.props.user.account.email);

    render() {
      const { bypass } = this.state;
      if (bypass) {
        return (
          <ComposedComponent { ...this.props } refreshData={ this.sync } />
        );
      }
      return (
        <Loader
          id='syncData'
          onMount={ this.sync }
          title='Updating Data'
          path='/'
        >
          <ComposedComponent { ...this.props } refreshData={ this.sync } />
        </Loader>
      );
    }
  }

  return withRouter(
    connect(
      ({
        dailyLogs,
        dashboard,
        injuries,
        training,
        user,
        subscription: {
          userSubscription,
          groupSubscription,
          stripeAccount: { individual }
        }
      }) => ({
        dailyLogs,
        dashboard,
        injuries,
        training,
        user,
        userSubscription,
        groupSubscription,
        stripeAccount: individual
      }),
      actions
    )(HOC)
  );
}

import * as actions from '../actions';
import { handleSignOutButtonPress } from 'src/lib/components';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Loader } from 'src/lib/components';

export function ensureStripeAccount(ComposedComponent) {
  class StripeHOC extends Component {
    constructor(props) {
      super(props);
      this.state = { loading: true };
    }

    async componentDidMount() {
      await this.props.getStripeAccounts();
      if (this.props.subscription.groupSubscription) {
        this.props.history.replace('/account/membership');
      } else {
        await this.props.getInvoices();
        this.setState({ loading: false });
      }
    }

    render() {
      if (this.state.loading) return <Loader id='ensureStripeAccount' title='getting account' />;
      return (
        <ComposedComponent { ...this.props } />
      );
    }
  }

  return withRouter(
    connect(
      ({ user, subscription }) => {
        return { user, subscription };
      },
      { ...actions, handleSignOutButtonPress }
    )(StripeHOC)
  );
}

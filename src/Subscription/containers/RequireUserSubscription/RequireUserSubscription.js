import * as actions from 'src/Subscription/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SceneContainer } from 'src/lib/components';
import { SubscriptionService } from '../../SubscriptionService';

import {
  SubscriptionForm,
  SubscriptionStatus
} from 'src/Subscription/components';

class _RequireUserSubscription extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      setDefaultCard,
      subscription: { stripeAccount }
    } = this.props;
    const subscription = SubscriptionService.formatSubscriptionData(
      stripeAccount.individual
    );

    return (
      <SceneContainer
        title={ 'Subscription' }
        headerButtons={{ left: 'none', right: {
          text: 'sign out', onPress: this.props.handleSignOutButtonPress
        }}}
      >
        <SubscriptionStatus subscription={ subscription } />
        <SubscriptionForm
          customerId={ subscription.customerId }
          setDefaultCard={ setDefaultCard }
          needSource={ !subscription.source }
        />
      </SceneContainer>
    );
  }
}

export const RequireUserSubscription = connect(
  null, actions
)(_RequireUserSubscription);

import _ from 'lodash';
import React, { Component } from 'react';
import { SceneContainer /* , Text */ } from 'src/lib/components';
import { SubscriptionService } from '../../SubscriptionService';
import { Toast } from 'native-base';
import {
  SubscriptionForm,
  SubscriptionStatus,
  PastDueInvoice
} from 'src/Subscription/components';

export class Subscription extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (_.isEmpty(
      this.props.subscription.stripeAccount.individual.sources.data
    )) {
      Toast.show({
        text: 'Looks like you need to update your payment method!',
        position: 'bottom',
        type: 'danger',
        duration: 5000
      });
    }
  }

  render() {
    const { subscription: { stripeAccount, invoices }} = this.props;
    const subscription = SubscriptionService.formatSubscriptionData(
      stripeAccount.individual
    );
    return (
      <SceneContainer title={ 'Subscription' }>
        <PastDueInvoice invoices={ invoices }/>
        <SubscriptionStatus subscription={ subscription } />
        <SubscriptionForm { ...this.props } />
      </SceneContainer>
    );
  }
}

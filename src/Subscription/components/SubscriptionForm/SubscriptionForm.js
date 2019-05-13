import * as sty from './SubscriptionForm.style';
import React, { Component } from 'react';

import { Icon, Toast, View } from 'native-base';
import { Button, Text, SpinnerOverlay, ConfirmModal } from 'src/lib/components';
import { TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { PaymentCardTextField } from 'tipsi-stripe';
import { withRouter } from 'react-router';

class _SubscriptionForm extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      formData: {
        params: {},
        valid: false
      },
      showPaymentForm: false,
      submitting: false,
      cancel: false
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.setState({ submitting: false });
  }

  handleFieldParamsChange = (valid, params) => {
    this.setState({ formData: { valid, params }});
  };

  handleSubmit() {
    this.setState({ submitting: true });
    const { user, setDefaultCard } = this.props;
    const customerId = user.data.stripeId;

    return setDefaultCard(customerId, this.state.formData.params)
    .then(() => {
      this.setState(this.initialState);
      Toast.show({
        text: 'Got it! Your card has been successfully updated',
        position: 'bottom',
        type: 'success',
        duration: 3000
      });
    })
    .catch(() => {
      this.setState(this.initialState);
      Toast.show({
        text: 'Could not update card', // TODO: add stripe's rec. messaging
        position: 'bottom',
        type: 'danger',
        duration: 4000
      });
    });
  }

  renderForm() {
    const {
      showPaymentForm,
      submitting,
      formData: { valid }
    } = this.state;
    if (showPaymentForm) {
      return (
        <View style={ sty.formWrapper }>
          <View style={ sty.formTitleWrapper }>
            <TouchableOpacity
              style={ sty.xButton }
              onPress={ () => this.setState({ showPaymentForm: false }) }
            >
              <Icon name='times' />
            </TouchableOpacity>
            <Text h6>add a card</Text>
          </View>
          <PaymentCardTextField
            disabled={ submitting }
            enabled={ !submitting }
            onParamsChange={ this.handleFieldParamsChange }
            style={ sty.cardTextField }
            { ...sty.cardForm }
          />
          <View style={ sty.submitButton }>
            <Button
              success
              disabled={ !valid || submitting }
              onPress={ () => this.handleSubmit() }
              label='SUBMIT'
            />
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    const { showPaymentForm } = this.state;
    const {
      subscription,
      cancelSubscription,
      handleSignOutButtonPress
    } = this.props;
    return (
      <View style={ sty.wrapper }>
        <ConfirmModal
          visible={ this.state.cancel }
          prompt='Are you sure you want to cancel?  You will lose access to the features in this app.'
          onCancel={ () => this.setState({ cancel: false }) }
          onConfirm={ () =>
            cancelSubscription().then(() => handleSignOutButtonPress())
          }
        />
        <SpinnerOverlay visible={ this.state.submitting } />
        <Collapsible align='center' collapsed={ !this.state.showPaymentForm }>
          {this.renderForm()}
        </Collapsible>
        {showPaymentForm ? null : (
          <View>
            <Button
              label={
                showPaymentForm
                  ? 'cancel'
                  : !subscription.source
                    ? 'add payment method'
                    : 'edit payment method'
              }
              primary
              onPress={ () => this.setState({ showPaymentForm: true }) }
            />
            <Button
              style={ sty.cancelButton }
              label='cancel subscription'
              onPress={ () => this.setState({ cancel: true }) }
            />
          </View>
        )}
      </View>
    );
  }
}

export const SubscriptionForm = withRouter(_SubscriptionForm);

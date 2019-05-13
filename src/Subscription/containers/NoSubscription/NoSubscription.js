import * as sty from './NoSubscription.style';
import { handleSignOutButtonPress } from 'src/lib/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SceneContainer, Text } from 'src/lib/components';

// import { SubscriptionForm } from '../../components';

class _NoSubscription extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { createSubscription, user } = this.props;
    return (
      <SceneContainer
        title={ 'Subscription' }
        headerButtons={{
          left: 'none',
          right: {
            text: 'sign out',
            onPress: this.props.handleSignOutButtonPress
          }
        }}
      >
        <Text h6 style={ sty.prompt }>
          You need to subscribe to proceed
        </Text>
        {/* <SubscriptionForm
          onSubmit={ (data) => createSubscription(data)}
        /> */}
      </SceneContainer>
    );
  }
}

export const NoSubscription = connect(
  null,
  { handleSignOutButtonPress }
)(_NoSubscription);

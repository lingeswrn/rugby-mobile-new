import { handleSignOutButtonPress } from 'src/lib/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SceneContainer, Text } from 'src/lib/components';

class _RequireOrgSubscription extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
        <Text
          style={{ marginHorizontal: 18, marginTop: 48, alignSelf: 'center' }}
        >
          The organization you joined is no longer active.
        </Text>
      </SceneContainer>
    );
  }
}

export const RequireOrgSubscription = connect(
  null,
  { handleSignOutButtonPress }
)(_RequireOrgSubscription);

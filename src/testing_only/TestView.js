import * as actions from 'src/account/actions/notifications';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'native-base';
import { SceneContainer, Text, Button } from 'src/lib/components';

class _TestView extends Component {
  render() {
    return (
      <SceneContainer title='test'>
        <View style={{ padding: 16 }}>
          <Button label='request' onPress={ this.props.setBadgeNumber }/>
        </View>
      </SceneContainer>
    );
  }
}

export const TestView = connect(null, actions)(_TestView);

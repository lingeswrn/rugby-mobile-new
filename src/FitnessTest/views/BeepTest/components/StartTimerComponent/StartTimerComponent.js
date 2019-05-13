import * as sty from './StartTimerComponent.style';
import React from 'react';
import { Text } from 'src/lib/components';
import { View, TouchableOpacity } from 'react-native';

export const StartTimerComponent = (props) => {
  return (
    <View style={ sty.container }>
      <TouchableOpacity
        disabled={ props.modalOpen }
        onPress={ props.onPressManual }
        style={ sty.manualEntryButton }
      >
        <Text h3 style={ sty.buttonText }>
          Enter Results Manually
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={ props.modalOpen }
        onPress={ props.onPressStart }
        style={ sty.button }
      >
        <Text h1 style={ sty.buttonText }>
          Start Timer
        </Text>
      </TouchableOpacity>
      <Text style={ sty.infoText }>
        Are you ready? The test begins when you press Start Timer.
      </Text>
    </View>
  );
};

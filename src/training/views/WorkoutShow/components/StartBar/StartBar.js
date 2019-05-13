import * as sty from './StartBar.style';

import React from 'react';
// import { Link } from 'react-router-native';
import { View, Button, Text } from 'native-base';

export const StartBar = (props) => {
  return (
    <View>
      <View style={ sty.wrapper }>
        <Button
          onPress={ props._onPress }
          style={ sty.button }
        >
          <Text style={ sty.buttonText }>
            START WORKOUT
          </Text>
        </Button>
      </View>
    </View>
  );
};

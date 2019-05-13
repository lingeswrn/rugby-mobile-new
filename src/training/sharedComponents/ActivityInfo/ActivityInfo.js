import * as sty from './ActivityInfo.style';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'src/lib/components/Text';
export class ActivityInfo extends Component {
  constructor(props) { super(props); }

  render() {
    const { template } = this.props;
    return (
      <View style={ sty.wrapper }>
        <Text h4 style={ sty.activityName }>{ template.activity.name }</Text>
      </View>
    );
  }
}

import * as sty from './MatchDayBanner.style';
import React, { Component } from 'react';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';

export class MatchDayBanner extends Component {
  constructor(props) { super(props); }
  render() {
    const { daysUntilGameday } = this.props;
    if (daysUntilGameday) {
      return (
        <View style={ sty.countdownWrapper }>
          <Text h5 style={ sty.countdown }>
            {
              `${daysUntilGameday} ${daysUntilGameday === 1 ? 'day' : 'days'} to fixture day`
            }
          </Text>
        </View>
      );
    } return null;
  }
}

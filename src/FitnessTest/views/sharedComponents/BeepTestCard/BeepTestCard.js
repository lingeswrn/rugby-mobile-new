import numeral from 'numeral';
import _ from 'lodash';
import * as sty from './BeepTestCard.style';
import React, { Component } from 'react';
import { View } from 'native-base';
import { Text } from 'src/lib/components';

export class BeepTestCard extends Component {
  render() {
    if (_.isEmpty(this.props.beepTest)) return null;
    const { superSize } = this.props;
    const {
      level,
      shuttle,
      voMax
    } = this.props.beepTest;
    return (
      <View style={ sty.beepTestItem }>
        <View style={ sty.row }>
          <View style={ sty.levelCol }>
            <Text h4 style={ sty.itemTitle }>
                Level
            </Text>
            <Text style={ sty.text(superSize) } h1>{level}</Text>
          </View>
          <View style={ sty.shuttleCol }>
            <Text h4 style={ sty.itemTitle }>
                Shuttles
            </Text>
            <Text style={ sty.text(superSize) } h1>{shuttle}</Text>
          </View>
          <View style={ sty.shuttleCol }>
            <Text h4 style={ sty.itemTitle }>
                VO<Text h6>2</Text> Max
            </Text>
            <Text style={ sty.text(superSize) } h1>{numeral(voMax).format('0.0')}</Text>
          </View>
        </View>
      </View>
    );
  }
}

import * as sty from './SegmentBar.style';
import React, { Component } from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';

export class SegmentBar extends Component {
  constructor(props) {
    super(props);
  }
  renderItems(items) {
    return _.map(items, (item, index) => {
      const { label, value } = item;
      return (
        <View key={ index } style={ sty.itemWrapper }>
          <Text h2 style={ sty.itemValue }>{ value }</Text>
          <Text h5 style={ sty.itemLabel }>{ _.upperCase(label) }</Text>
        </View>
      );
    });
  }

  render() {
    const { segment, timerValue, totalSegments } = this.props;
    return (
      <View style={ sty.wrapper }>
        <View style={ sty.segmentTitleContainer }>
          <Text h1 style={ sty.segmentTitleSmall }>{ 'SEGMENT  ' }</Text>
          <Text h1 style={ sty.segmentTitle }>
            {segment.segmentNumber.toString()}
          </Text>
          <Text h1 style={ sty.segmentTitleSmall }>{ '  OF   ' }</Text>
          <Text h1 style={ sty.segmentTitle }>
            {totalSegments.toString()}
          </Text>
        </View>
        <View style={ sty.itemListContainer }>
          { this.renderItems([
            { label: 'effort', value: numeral(segment.effort).format('0%') },
            { label: 'time', value: timerValue },
            { label: 'thr', value: segment.THR }
          ])}
        </View>
      </View>
    );
  }
}

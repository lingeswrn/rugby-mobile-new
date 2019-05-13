import * as sty from './PreviousTestResults.style';
import moment from 'moment';
import _ from 'lodash';
import React, { Component } from 'react';
import { Text } from 'src/lib/components';
import { View } from 'native-base';

export class PreviousTestResults extends Component {
  get percentChange() {
    const { results, prevResults } = this.props;
    return Math.abs(
      _.round(((results.voMax - prevResults.voMax) / prevResults.voMax) * 100)
    );
  }

  get didImprove() {
    const { results, prevResults } = this.props;
    return results.voMax - prevResults.voMax > 0;
  }

  render() {
    if (_.isEmpty(this.props.prevResults)) return null;
    const {
      prevResults: { level, shuttle, voMax, createdAt }
    } = this.props;
    return (
      <View style={ sty.container }>
        <View style={ sty.titleWrapper }>
          <Text h5 inverse>{`Previous test results from ${moment(
            createdAt
          ).format('MMM D')}`}</Text>
        </View>
        <View style={ sty.innerContainer }>
          <View style={ sty.row }>
            <Text h3>Level</Text>
            <Text h3>{level}</Text>
          </View>
          <View style={ sty.row }>
            <Text h3>Shuttles</Text>
            <Text h3>{shuttle}</Text>
          </View>
          <View style={ sty.row }>
            <Text h3>
              VO<Text h5>2</Text> Max
            </Text>
            <Text h3>{voMax}</Text>
          </View>
        </View>
        <View style={ sty.percentContainer(this.didImprove) }>
          <Text h1 style={ sty.percentage(this.didImprove) }>
            {`${this.percentChange}%`}
          </Text>
          <Text style={ sty.resultText(this.didImprove) }>
            {`Performance ${this.didImprove ? 'increase' : 'decrease'}`}
          </Text>
        </View>
      </View>
    );
  }
}

import * as sty from './SupersetChart.style';

import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { Bar } from 'react-native-progress';

export class SupersetChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      currentSet = 0,
      totalSets = 0
    } = this.props;
    const progress = (currentSet - 1) / (totalSets);
    return (
      <View style={ sty.wrapper }>
        <View style={ sty.titleWrapper }>
          <Text style={ sty.title }>{ 'SUPERSET' }</Text>
          <Text style={ sty.description }>
            { 'Complete as many reps as possible at the target weight.' }
          </Text>
        </View>
        <Bar
          progress={ progress }
          borderRadius={ 0 }
          width={ sty.progressBar.width }
          borderWidth={ 0 }
          borderColor={ sty.progressBar.color }
          height={ sty.progressBar.height }
          style={ sty.progressBar.container }
          { ...sty.progressBar(progress) }
        >
          <View style={ sty.contentWrapper }>
            <Text style={ sty.setCount }>
              { `Set ${currentSet.toString()} of ${totalSets.toString()}` }
            </Text>
          </View>
        </Bar>
      </View>
    );
  }
}

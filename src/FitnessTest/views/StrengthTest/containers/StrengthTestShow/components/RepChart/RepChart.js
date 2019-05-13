import * as sty from './RepChart.style';

import React, { Component } from 'react';
import { Text, View } from 'native-base';
import { ProgressBar } from './Bar';


export class RepChart extends Component {
  constructor(props) {
    super(props);
  }

  renderSetBars() {
    const { reps } = this.props.activity.template;
    return reps.map((targetReps, index) => {
      const userReps = this.props.activity.current.reps[index] || 0;
      return (
        <View
          key={ index }
          style={ sty.barWrapper }
        >
          <Text style={ sty.targetRepsLabel }>{ targetReps }</Text>
          <ProgressBar
            progress={ userReps / targetReps }
          />
          <Text style={ sty.userRepsLabel }>{ userReps }</Text>
        </View>
      );
    });
  }
  render() {
    return (
      <View style={ sty.chartWrapper }>
        { this.renderSetBars() }
      </View>
    );
  }
}

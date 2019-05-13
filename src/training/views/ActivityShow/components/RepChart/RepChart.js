import * as sty from './RepChart.style';

import React, { Component } from 'react';
import { Text, View } from 'native-base';

export class RepChart extends Component {
  constructor(props) {
    super(props);
  }

  renderSetBars() {
    const { reps } = this.props.activity.target;
    return reps.map((targetReps = 1, index) => {
      const setNumber = (index + 1);
      const userReps = this.props.activity.model.reps[index] || 0;
      const currentScore = ( userReps / targetReps );
      return (
        <View
          key={ index }
          style={ sty.barWrapper }
        >
          <Text style={ sty.targetRepsLabel(currentScore) }>
            { `Set ${setNumber}: `} { userReps }/{ targetReps }
          </Text>
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

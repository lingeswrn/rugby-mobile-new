import * as sty from './SegmentChart.style';
import React, { Component } from 'react';
import { View } from 'native-base';
import { Bar } from 'react-native-pathjs-charts';
import _ from 'lodash';

export class SegmentChart extends Component {
  constructor(props) { super(props); }

  // tricks chart component into never doing it's absurd color cycling
  getPallete() {
    const { segments, activeSegmentIndex } = this.props;
    const pallete = _.times(segments.length, _.constant(sty.barColorRGB));
    pallete[activeSegmentIndex] = sty.activeBarColorRGB;
    return pallete;
  }

  render() {
    const options = {
      width: sty.chartWidth,
      // height: 225,
      margin: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      color: sty.barColorHex,
      gutter: 3,
      axisX: {
        showAxis: false,
        showLines: false,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: sty.label
      },
      axisY: {
        min: 0,
        max: 1,
        showAxis: false,
        showLines: false,
        showLabels: false,
        showTicks: false,
        zeroAxis: true,
        orient: 'left',
        label: sty.label
      }
    };
    const { segments = []} = this.props;

    if (_.isEmpty(segments)) return null;
    // gives the package a whole bunch of empty datasets
    // so it doesn't try to run repeaters on the pallete prop
    const data = _.times((segments.length - 1), _.constant([]));
    data.unshift(segments);
    return (
      <View style={ sty.wrapper }>
        <Bar
          data={ data }
          options={ options }
          accessor={ (item) => item.effort }
          stroke={ sty.stroke }
          pallete={ this.getPallete() }
        />
      </View>
    );
  }
}

import * as sty from './Slider.style';
import React, { Component } from 'react';
import _ from 'lodash';
// import numeral from 'numeral';
import SliderBase from 'react-native-slider';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';

export class Slider extends Component {
  constructor(props) {
    super(props);
    const { input = {}} = props;
    this.state = {
      focused: false,
      blurred: false,
      status: 'danger',
      value: input.value || null
    };
  }

  renderErrorText() {
    const { meta: { touched, error = {}}} = this.props;
    const hasError = touched && !_.isEmpty(error);
    if (hasError) {
      return (
        <View style={ sty.errorWrapper }>
          <Text style={ sty.errorText }>
            { typeof error === 'object' ? error.message : error }
          </Text>
        </View>
      );
    } return null;
  }

  getColorStatus(value, active) {
    switch (true) {
      case active: return 'warning';
      case (value && (value > 0)): return 'success';
      default: return 'danger';
    }
  }

  renderTickMarks() {
    const { maximumValue, minimumValue, step, tickSize } = this.props;
    const { value } = this.state;
    const numberOfTickMarks = _.floor((maximumValue - minimumValue) / step) + 1;
    return _.map(_.range(0, numberOfTickMarks), (index) => {
      const tickVal = index * step;
      const tickStyle = sty.tick(index, tickSize, tickVal, value);
      return <View key={ index } style={ tickStyle } />;
    });
  }
  renderTickLabels(labels) {
    const last = labels.length - 1;
    return (
      <View style={ sty.tickLabelWrapper }>
        {_.map(labels, (label, index) => (
          <View key={ index } style={ sty.tickLabelContainer(index, last) }>
            <Text h6 style={ sty.tickLabel }>{ label }</Text>
          </View>
        ))}
      </View>
    );
  }
  render() {
    const {
      input, label, meta: { active }, hideTickMarks, tickLabels, ...rest
    } = this.props;
    const { value } = this.state;
    const status = this.getColorStatus(value, active);
    return (
      <View style={ sty.inputWrapper }>
        <View style={ sty.labelWrapper }>
          <Text h5 style={ sty.label }>{ _.upperCase(label) }</Text>
        </View>
        <View>
          <View style={ sty.tickWrapper }>
            { hideTickMarks ? null : this.renderTickMarks() }
          </View>
          <SliderBase
            { ...input }
            value={ this.state.value }
            onValueChange={ (val) => this.setState({ value: val }) }
            onSlidingComplete={ () => this.props.input.onChange(value) }
            maximumTrackTintColor={ sty.getFadedColor(status) }
            minimumTrackTintColor={ sty.getColor(status) }
            thumbTintColor={ sty.getThumbColor(status) }
            { ...rest }
          />
        </View>
        { (hideTickMarks || _.isEmpty(tickLabels)) ?
          null : this.renderTickLabels(tickLabels) }
      </View>
    );
  }
}

Slider.defaultProps = {
  animateTransitions: true,
  hideTickMarks: false,
  maximumValue: 10,
  maximumTrackTintColor: sty.maximumTrackTintColor,
  minimumValue: 0,
  step: 2.5,
  tickLabels: [],
  tickSize: 20,
  trackStyle: sty.track
};

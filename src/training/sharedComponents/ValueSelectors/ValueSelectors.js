import * as sty from './ValueSelectors.style';
import React, { Component } from 'react';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';
import _ from 'lodash';
import { Picker } from 'lib/components/Picker';
import { kgToLb, lbToKg } from 'rbv-core/helpers';

export class ValueSelectors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reps: props.reps,
      weight: props.displayWeight ? props.weight : 0
    };
  }

  onChange = (update) => this.setState(
    update, () => this.props.onChange(update)
  )

  get items() {
    return this.props.units === 'imperial'
      ? _.range(0, 400, 5)
      : _.range(0, 200, 2);
  }

  renderWeight = () => {
    const { displayWeight = true, units, weight } = this.props;
    return displayWeight ?
      <View style={ sty.container }>
        <View style={ sty.labelWrapper }>
          <Text h5 style={ sty.label }>{ 'WEIGHT' }</Text>
        </View>
        <Picker
          items={ this.items }
          value={ units === 'imperial'
            ? weight
            : lbToKg(weight) }
          onChange={ (value) => this.onChange(
            { weight: units === 'imperial' ? value : kgToLb(value) }
          ) }
        />
      </View> :
      null;
  }

  render() {
    const { maxReps = 99 } = this.props;
    return (
      <View style={ sty.wrapper }>
        <View style={ sty.container }>
          <View style={ sty.labelWrapper }>
            <Text h5 style={ sty.label }>{ 'REPS' }</Text>
          </View>
          <Picker
            items={ _.range(0, maxReps) }
            value={ this.props.reps }
            onChange={ (value) => this.onChange({ reps: value }) }
          />
        </View>
        { this.renderWeight() }
      </View>
    );
  }
}

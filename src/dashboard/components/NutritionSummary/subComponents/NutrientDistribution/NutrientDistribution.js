import * as sty from './NutrientDistribution.style';

import React, { Component } from 'react';
import _ from 'lodash';
import { Bar } from 'react-native-progress';
import { View } from 'native-base';
import { Text } from 'src/lib/components';

export class NutrientDistribution extends Component {
  constructor(props) { super(props); }

  renderList(nutrients, target, calPerGram) {
    return _.map(nutrients, (value, key) => {
      const grams = ((target * value) / calPerGram[key]).toFixed(1);
      return (
        <View style={ sty.itemWrapper } key={ key }>
          <Bar
            borderRadius={ 0 }
            borderWidth={ 0 }
            borderColor={ sty.progressBarColors[key] }
            height={ 42 }
            progress={ value }
            style={ sty.progressBar }
            useNativeDriver
            width={ 200 }
            color={ sty.progressBarColors[key] }
            unfilledColor={ sty.barColorsUnfilled[key] }
          />
          <View style={ sty.labelWrapper }>
            <Text style={ sty.itemLabelValue(key) } h3>
              { `${ grams } g` }
            </Text>
            <Text style={ sty.itemLabel } h3>{ ` ${key}` }</Text>
          </View>
        </View>
      );
    });
  }
  render() {
    const { distribution, calPerGram, target } = this.props;
    return (
      <View style={ sty.wrapper }>
        { this.renderList(distribution, target, calPerGram) }
      </View>
    );
  }
}

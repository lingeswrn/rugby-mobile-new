import * as sty from './NutritionSummary.style';

import React, { Component } from 'react';
// import _ from 'lodash';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';
import { NutritionService } from 'rbv-core/services/Rugbyvault/NutritionService';
import {
  NutrientDistribution,
  HydrationTarget,
  NutritionSources
} from './subComponents';

export class NutritionSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.nutrition = NutritionService(props.user.data);
  }

  render() {
    const { workout, user } = this.props;
    const weight = user.data.athleteProfile.massInKilograms;
    const target = this.nutrition.getTotalCalories(workout);
    return (
      <View style={ sty.wrapper }>
        <View style={ sty.titleWrapper }>
          <Text h3 inverse>
            {'nutrition'}
          </Text>
        </View>
        <View style={ sty.container }>
          <View style={ sty.targetCalsWrapper }>
            <Text h1 style={ sty.targetCalsValue }>
              {target}
            </Text>
            <Text h1 style={ sty.targetCalsLabelTop }>
              {'target'}
            </Text>
            <Text h1 style={ sty.targetCalsLabelBottom }>
              {'calories'}
            </Text>
          </View>
          <NutrientDistribution
            distribution={ this.nutrition.metrics.distribution }
            calPerGram={ this.nutrition.metrics.nutrientCaloriesPerGram }
            target={ target }
          />
        </View>
        <NutritionSources />
        <HydrationTarget
          schedule={ this.props.schedule }
          weight={ weight }
          workout={ workout }
        />
      </View>
    );
  }
}

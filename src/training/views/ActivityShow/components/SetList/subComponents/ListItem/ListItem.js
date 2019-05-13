import * as sty from './ListItem.style.js';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';
import { lbToKgModThree } from 'rbv-core/helpers';

export const ListItem = ({ item, onPress, units }) => {
  const {
    index,
    setIndex,
    setNumber,
    targetReps,
    userReps,
    userWeight,
    trainingType
  } = item;
  const normal = sty.setLabel(index, setIndex);
  const small = sty.small(normal);
  const weight = units === 'imperial' ? userWeight : lbToKgModThree(userWeight);
  return (
    <TouchableOpacity
      style={ sty.listItemWrapper(index, setIndex) }
      onPress={ () => onPress(index) }
    >
      <View style={ sty.setWrapper }>
        <Text h6 style={ normal }>{ `Set ${setNumber.toString()}` }</Text>
      </View>
      <View style={ sty.valueWrapper }>
        <Text style={ small }>{ userReps.toString() }</Text>
        <Text style={ small }>{ '/' }</Text>
        <Text h5 style={ normal }>{ targetReps.toString() }</Text>
        <Text style={ small }>{ 'reps' }</Text>
        { trainingType === 'lifting' && !isNaN(weight) ?
          <View style={ sty.liftingWrapper }>
            <Text style={ small }>{ ' @ ' }</Text>
            <Text h5 style={ normal }>{weight.toString()}</Text>
            <Text style={ small }>
              { units === 'imperial' ? 'lbs.' : 'kg.' }
            </Text>
          </View> : null }
      </View>
    </TouchableOpacity>
  );
};

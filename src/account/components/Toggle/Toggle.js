import React from 'react';
import { Button } from 'src/lib/components';
import { View } from 'native-base';
import * as sty from './Toggle.style';

export const Toggle = ({ selectedIndex, updateForm }) => {
  return(
    <View style={ sty.buttonContainer }>
      <Button onPress={ () => updateForm(0) }
        primary
        style={ sty.button(selectedIndex === 0, true) }
        label={ 'SIGN IN' }
      />
      <Button onPress={ () => updateForm(1) }
        primary
        style={ sty.button(selectedIndex === 1, selectedIndex < 1) }
        label={ 'SIGN UP' }
      />
      <Button onPress={ () => updateForm(2) }
        primary
        style={ sty.button(selectedIndex === 2, false) }
        label={ 'RESET' }
      />
    </View>
  );
};

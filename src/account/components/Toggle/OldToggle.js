import React from 'react';

import {
  SegmentedControlIOS
} from 'react-native';
import * as sty from '../../containers/Login.style';

export const Toggle = ({ selectedIndex, updateForm }) => {
  return (
    <SegmentedControlIOS
      disabled
      values={ ['Sign In', 'Sign Up'] }
      selectedIndex={ selectedIndex }
      onChange={ (event) =>
        updateForm(event.nativeEvent.selectedSegmentIndex) }
      tintColor={ sty.segmentTintColor } />
  );
}

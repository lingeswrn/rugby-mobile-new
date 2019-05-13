import * as sty from './SpinnerOverlay.style';
import React from 'react';
import {
  Modal as ModalBase,
  View
} from 'react-native';
import { Spinner } from 'native-base';

export const SpinnerOverlay = ({ visible }) => {
  if (!visible) return null;
  return (
    <ModalBase visible={ visible } transparent>
      <View style={ sty.container }>
        <Spinner color={ sty.loaderColor } />
      </View>
    </ModalBase>
  );
};

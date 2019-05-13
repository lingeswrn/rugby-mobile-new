import * as sty from './Modal.style';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'src/lib/components';

export const Modal = ({
  prompt = '',
  confirmText = 'confirm',
  confirm,
  cancelText = 'cancel',
  cancel,
  modalOpen
}) => {
  return modalOpen ? (
    <View style={ sty.container }>
      <Text h3 style={ sty.promptText }>{prompt}</Text>
      <TouchableOpacity style={ sty.button } onPress={ confirm }>
        <Text h1 style={ sty.buttonText }>{confirmText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ sty.button } onPress={ cancel }>
        <Text h1 style={ sty.buttonText }>{cancelText}</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

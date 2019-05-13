import * as sty from './ConfirmModal.style';
import React from 'react';
import { Modal as ModalBase, View, TouchableOpacity } from 'react-native';
import { Text } from '../Text';

export const ConfirmModal = ({
  visible = false,
  prompt = 'Are you sure?',
  onConfirm = () => {},
  onCancel = () => {}
}) => {
  return (
    <ModalBase visible={ visible } transparent>
      <View style={ sty.container }>
        <Text h3 style={ sty.promptText }>
          {prompt}
        </Text>
        <View style={ sty.buttons }>
          <TouchableOpacity
            onPress={ onCancel }
            style={ sty.button }
          >
            <Text style={ sty.buttonText } h4 inverse>
              nevermind
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ onConfirm }
            style={ sty.button }
          >
            <Text style={ sty.buttonText } h4 inverse>
              ok
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalBase>
  );
};

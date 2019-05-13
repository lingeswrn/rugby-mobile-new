import * as sty from './Modal.style';
import React from 'react';
import {
  TouchableOpacity,
  Modal as ModalBase,
  Image,
  Dimensions
} from 'react-native';

const carbs = require('src/images/carb_sources.png');
const fat = require('src/images/fat_sources.jpg');
const protein = require('src/images/protein_sources.jpg');

export const Modal = ({ img, close }) => {
  const { height } = Dimensions.get('window');
  const source = img === 'carbs'
    ? carbs : img === 'fat'
      ? fat : img === 'protein'
        ? protein : undefined;

  return (
    <ModalBase visible={ source ? true : false } transparent>
      <TouchableOpacity style={ sty.container } onPress={ close }>
        <Image style={ sty.img(height) } source={ source } />
      </TouchableOpacity>
    </ModalBase>
  );
};

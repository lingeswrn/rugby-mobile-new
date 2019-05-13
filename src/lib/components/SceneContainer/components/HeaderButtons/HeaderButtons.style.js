import { colors, darken } from 'rbv-core/colors';
import { Platform } from 'react-native';
const bebasNeue = Platform.OS === 'ios' ? 'Bebas Neue' : 'BebasNeue';

export const icon = {
  backgroundColor: 'transparent',
  fontSize: 21,
  color: colors.gray.lightest
};
export const iconDisabled = {
  ...icon,
  color: darken(colors.gray.light, 0.25)
};

export const fabContainer = {
  // justifyContent: 'flex-start',
  // alignItems: 'flex-end',
  height: 24,
  width: 24,
  backgroundColor: 'transparent',
  // position: 'relative',
  // top: 0
};

export const fabButton = {
  backgroundColor: 'transparent'
};

export const fab = {};

export const text = {
  fontFamily: bebasNeue,
  fontSize: 16
};

export const textDisabled = {
  ...text,
  color: darken(colors.gray.light, 0.25)
};

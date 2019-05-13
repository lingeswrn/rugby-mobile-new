import { colors } from 'rbv-core/colors';

import { Platform } from 'react-native';
const bebasNeue = Platform.OS === 'ios' ? 'Bebas Neue' : 'BebasNeue';

export const wrapper = {
  alignItems: 'center',
  backgroundColor: colors.canvas.primary,
  flex: 1,
  justifyContent: 'center',
};

export const loaderText = {
  color: colors.text.primary,
  fontFamily: bebasNeue,
  fontSize: 28
};
export const loaderColor = colors.brand.primary;

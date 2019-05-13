import { colors } from 'rbv-core/colors';

import { Platform } from 'react-native';
const bebasNeue = Platform.OS === 'ios' ? 'Bebas Neue' : 'BebasNeue';

export const title = {
  fontFamily: bebasNeue,
  color: colors.text.inverse,
  letterSpacing: 1.25,
  fontSize: 17,
  fontWeight: Platform.OS === 'ios' ? '600' : '400'
};

export const subtitle = {
  fontFamily: bebasNeue,
  color: colors.text.inverse,
  fontSize: 12,
  fontWeight: '100',
  letterSpacing: 2
};

export const header = {
  backgroundColor: colors.canvas.inverse,
  borderBottomWidth: 0,
  borderBottomColor: colors.gray.darker,
  height: 62,
  paddingLeft: 5,
  paddingRight: 5,
  shadowColor: colors.gray.darkest,
  shadowOpacity: 1,
  shadowRadius: 6,
  shadowOffset: {
    width: 0,
    height: -7
  }
};

export const body = { flex: 2 };

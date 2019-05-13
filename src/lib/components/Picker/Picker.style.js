import { Platform } from 'react-native';

export const container = {
  alignSelf: 'stretch',
  flex: 1
};
export const picker = {
  alignItems: 'stretch',
  justifyContent: 'center',
  height: undefined,
  // flexDirection: 'column-reverse',
  display: 'flex',
  flex: 1,
  flexShrink: 2,
  position: 'relative',
  borderWidth: 0,
  overflow: 'hidden'
};

export const indicator = {};

export const item = {
  fontFamily: 'BebasNeue',
  fontSize: Platform.OS === 'ios' ? 28 : 18,
  letterSpacing: 2
};

import { colors } from 'rbv-core/colors';
import { Platform } from 'react-native';
const bg = Platform.OS === 'ios' ?
  {} :
  { backgroundColor: '#fff' };
export const wrapper = {
  backgroundColor: 'transparent',
  zIndex: 100,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'stretch',
  position: 'absolute',
  top: 20,
  bottom: 0,
  left: 0,
  right: 0,
  ...bg
};

export const listWrapper = {
  marginLeft: 0
};

export const itemWrapper = {
  marginLeft: 0,
  paddingHorizontal: 10,
  justifyContent: 'space-between'
};

export const itemDividerWrapper = {
  backgroundColor: colors.brand.primary
};

export const dividerLabel = {
  alignSelf: 'center',
  color: colors.text.inverse
};

export const buttonWrapper = {
  position: 'absolute',
  width: 125,
  bottom: 25,
  justifyContent: 'center',
  alignSelf: 'center'
};
export const button = { justifyContent: 'center' };

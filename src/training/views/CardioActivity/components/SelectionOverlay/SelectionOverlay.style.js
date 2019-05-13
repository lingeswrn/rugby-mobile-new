import { colors } from 'rbv-core/colors';
import { Platform } from 'react-native';
const bg = Platform.OS === 'ios' ?
  {} :
  { backgroundColor: '#fff' };

export const wrapper = {
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
  paddingHorizontal: 10
};

export const itemWrapperSelected = {
  ...itemWrapper,
  backgroundColor: colors.canvas.inverse
};

export const itemLabel = {};
export const itemLabelSelected = {
  ...itemLabel,
  color: colors.text.inverse
};


export const itemDividerWrapper = {
  backgroundColor: colors.brand.primary
};

export const dividerLabel = {
  paddingLeft: 8,
  color: colors.text.inverse
};

export const buttonWrapper = {
  backgroundColor: colors.brand.primary,
  alignSelf: 'stretch',
  alignItems: 'center',
  paddingVertical: 12,
  // position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 80,
  flex: 0
};

export const button = {
  width: 150,
  borderColor: colors.gray.lightest
};
export const label = {
  color: colors.gray.lightest
};

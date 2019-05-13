import { colors } from 'rbv-core/colors';
import { Dimensions, Platform } from 'react-native';
const { height/* , width */ } = Dimensions.get('window');

export const scene = {
  backgroundColor: undefined,
  flex: 1,
  alignSelf: 'stretch'
};

export const headerlessScene = {
  ...scene,
  paddingTop: Platform.OS === 'android' ? 0 : 20
};

export const fixed = {
  ...scene,
  height
};
export const center = {
  flex: 1,
  alignItems: 'stretch',
  alignSelf: 'center',
  justifyContent: 'center'
};


export const pad = {
  paddingHorizontal: 10
};

export const padVertical = {
  paddingVertical: 20
};

export const contentWrapper = {
  flex: 1,
  height
};

export const bgImageContainer = {
  backgroundColor: colors.canvas.primary,
  display: 'flex',
  flex: 1,
  left: 0,
  right: 0
};

export const refresh = {
  backgroundColor: colors.canvas.primary,
  tintColor: colors.brand.primary,
  titleColor: colors.text.primary
};

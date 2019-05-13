import { colors, /* fade */ } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const wrapper = {
  alignItems: 'stretch',
  backgroundColor: colors.gray.lightest,
};

export const timerContainer = {
  alignItems: 'stretch',
  borderRadius: 0,
  justifyContent: 'center',
  height: 150,
};

export const timer = {
  alignSelf: 'center',
  color: colors.gray.darkest,
  flex: 0,
  fontSize: 100,
  letterSpacing: 2
};

export const label = {
  fontSize: 24,
  lineHeight: 27,
  color: colors.gray.lightest,
  fontWeight: '500'
};

export const icon = {
  color: colors.gray.lightest,
  marginLeft: 8,
  marginTop: 2
};

export const buttonWrapper = {
  alignSelf: 'stretch',
  backgroundColor: colors.brand.primary,
  flex: 0,
  height: 70
};

export const button = {
  borderColor: colors.gray.lightest,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderTopWidth: 0,
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  paddingTop: 12,
  paddingBottom: 12,
  height: 70,
  width
};

export const buttonText = {
  color: colors.gray.lightest,
  fontWeight: '800',
  fontSize: 28,
  lineHeight: 32,
  letterSpacing: 1.5
};

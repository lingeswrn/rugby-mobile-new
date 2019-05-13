import { colors, fade } from 'rbv-core/colors';

export const iconStyle = {
  color: colors.gray.lightest,
  paddingLeft: 8,
  fontSize: 24
};

export const iconStyleError = {
  ...iconStyle,
  color: colors.brand.warning
};

export const errorWrapper = {
  alignItems: 'center',
  alignSelf: 'stretch',
  flex: 0,
  justifyContent: 'flex-start',
  backgroundColor: colors.brand.warning,
  borderWidth: 2,
  borderColor: colors.brand.warning,
  marginTop: -2,
  marginLeft: 0,
  marginRight: 0,
  padding: 0
};
export const iconWrapper = {
  flex: 0,
  flexBasis: '14%',
  borderRightWidth: 2,
  borderRightColor: colors.gray.lightest
};
export const inputWrapper = {
  flex: 0,
  height: 52,
  marginLeft: 0,
  marginBottom: 20,
  // borderWidth: 2,
  // borderColor: colors.brand.warning,
};

export const textInputContainer = {
  marginLeft: 0,
  borderBottomWidth: 0,
  backgroundColor: fade(colors.gray.light, 0.45),
};
export const textInput = {
  top: 0,
  marginLeft: 5
};

export const errorText = {
  color: colors.gray.lightest
};

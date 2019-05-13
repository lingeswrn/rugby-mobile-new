import { colors, fade } from 'rbv-core/colors';

export const container = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
  backgroundColor: fade(colors.gray.darkest, 0.2),
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10000,
  padding: 24
};

export const loaderColor = colors.gray.lightest;

export const promptText = {
  alignSelf: 'center',
  color: colors.gray.lightest,
  marginBottom: 48
};

export const buttonText = {
  color: colors.gray.lightest
};

export const buttons = {
  // flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  // alignItems: 'center'
};

export const button = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 16,
  paddingVertical: 12,
  paddingHorizontal: 36,
  backgroundColor: fade(colors.gray.primary, 0.5),
  marginHorizontal: 18,
  borderRadius: 0,
  borderWidth: 2,
  borderColor: fade(colors.gray.lightest, 0.1),
};

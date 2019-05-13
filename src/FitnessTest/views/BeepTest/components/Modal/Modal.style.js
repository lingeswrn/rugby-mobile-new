import { colors, fade } from 'rbv-core/colors';

export const container = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
  backgroundColor: fade(colors.gray.darkest, 0.25),
  flex: 1,
  justifyContent: 'center',
  alignItems: 'stretch',
  zIndex: 10000,
  padding: 24
};

export const promptText = {
  alignSelf: 'center',
  color: colors.gray.lightest,
  marginBottom: 48
};

export const buttonText = {
  color: colors.gray.lightest
};

export const button = {
  marginVertical: 16,
  flexDirection: 'row',
  paddingVertical: 12,
  paddingHorizontal: 24,
  backgroundColor: fade(colors.gray.primary, 0.5),
  justifyContent: 'center',
  marginHorizontal: 18,
  borderRadius: 0,
  borderWidth: 2,
  borderColor: fade(colors.gray.lightest, 0.1),
};

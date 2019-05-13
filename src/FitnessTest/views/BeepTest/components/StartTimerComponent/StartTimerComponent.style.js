import { colors, fade } from 'rbv-core/colors';

export const container = {
  marginHorizontal: 18,
};

export const manualEntryButton = {
  height: 76,
  flexDirection: 'row',
  paddingVertical: 12,
  paddingHorizontal: 24,
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 8,
  borderRadius: 0,
  borderWidth: 2,
  borderColor: fade(colors.gray.lightest, 0.1),
};

export const button = {
  ...manualEntryButton,
  backgroundColor: fade(colors.primary.light, 0.15),
};

export const buttonText = {
  color: colors.gray.lightest
};

export const infoText = {
  fontSize: 14,
  fontStyle: 'italic',
  color: colors.gray.lightest,
  marginTop: 8
};

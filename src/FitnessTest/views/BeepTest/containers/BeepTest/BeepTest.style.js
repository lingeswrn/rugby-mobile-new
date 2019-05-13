import { colors, fade } from 'rbv-core/colors';

export const container = {
  backgroundColor: colors.canvas.accent,
  flex: 1
};

export const header = {
  marginTop: 16,
  padding: 6
};

export const icon = {
  color: colors.gray.lightest,
  fontSize: 30
};

export const innerContainer = {
  flex: 1,
  justifyContent: 'center'
};

export const levelShuttleContainer = {
  alignItems: 'center'
};

export const level = {
  fontSize: 124,
  color: colors.text.inverse
};

export const shuttle = {
  fontSize: 90,
  marginTop: -12,
  color: colors.text.inverse
};

export const manualEntryButton = {
  height: 76,
  flexDirection: 'row',
  paddingVertical: 12,
  paddingHorizontal: 24,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 18,
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

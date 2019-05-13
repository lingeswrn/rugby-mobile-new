import { colors, fade } from 'rbv-core/colors';

export const container = {
  flex: 1,
  justifyContent: 'space-around',
  alignItems: 'center'
};

export const headingContainer = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

export const heading = {
  fontSize: 96,
  marginBottom: 24,
  color: colors.gray.lightest
};

export const text = {
  paddingHorizontal: 36,
  color: colors.gray.lightest,
  fontSize: 24,
  fontWeight: '200'
};

export const buttons = {
  flex: 3,
  justifyContent: 'center',
};

export const button = {
  flexDirection: 'row',
  paddingVertical: 12,
  paddingHorizontal: 24,
  backgroundColor: fade(colors.primary.light, 0.15),
  justifyContent: 'center',
  marginVertical: 18,
  borderRadius: 0,
  borderWidth: 2,
  borderColor: fade(colors.gray.lightest, 0.1),
};

export const buttonText = {
  color: colors.gray.lightest
};

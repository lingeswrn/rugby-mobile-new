import { colors, fade } from 'rbv-core/colors';

export const container = {
  flex: 1,
  flexDirection: 'row',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderColor: colors.gray.primary
};

export const wrapper = {
  backgroundColor: fade(colors.gray.light),
  paddingVertical: 0
};

export const titleWrapper = {
  flex: 0,
  height: 42,
  backgroundColor: colors.brand.primary,
  alignItems: 'center',
  justifyContent: 'center'
};

export const targetCalsWrapper = {
  alignItems: 'center'
};

export const targetCalsLabel = {
  color: colors.gray.dark
};

export const targetCalsLabelTop = {
  ...targetCalsLabel,
  fontSize: 48,
  lineHeight: 48,
  marginBottom: -8,
  letterSpacing: 1.15
};

export const targetCalsLabelBottom = {
  ...targetCalsLabel,
  fontSize: 40,
  lineHeight: 40,
  marginBottom: 0
};

export const targetCalsValue = {
  get fontSize() { return 65; },
  lineHeight: this.fontSize,
  marginBottom: -10,
  letterSpacing: 1.5
};

import { colors, fade } from 'rbv-core/colors';

export const container = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
  backgroundColor: fade(colors.gray.darkest, 0.5),
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10000,
  padding: 24
};

export const loaderColor = colors.gray.lightest;

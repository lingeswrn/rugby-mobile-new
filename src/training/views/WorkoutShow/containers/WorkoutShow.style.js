import { colors, fade } from 'rbv-core/colors';

export const startBarWrapper = {
  backgroundColor: fade(colors.gray.darkest, 0.1),
  flex: 0,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  paddingVertical: 5,
  height: 75
};

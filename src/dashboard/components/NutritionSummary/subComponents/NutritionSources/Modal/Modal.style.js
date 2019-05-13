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
  alignItems: 'center',
  zIndex: 10000,
  padding: 24
};

export const img = (screenHeight) => {
  // gets height -- multiple of 100 less than the height of the screen
  const height = screenHeight - (screenHeight % 50);
  // since the image dimensions are 2:1
  const width = height / 2;
  return {
    width,
    height
  };
};

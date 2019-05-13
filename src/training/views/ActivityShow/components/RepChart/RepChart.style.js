import { colors, darken } from 'rbv-core/colors';

export const bar = (score) => {
  switch(true) {
    case score === 0:
      return { color: colors.brand.primary };
    case score < 1:
      return { color: darken(colors.brand.warning, 0.15) };
    case score >= 1:
      return { color: colors.brand.success };
    default:
      return { color: colors.brand.warning };
  }
};

export const barWrapper = {
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  flex: 1,
  paddingVertical: 10,
};

export const chartWrapper = {
  backgroundColor: colors.gray.lightest,
  paddingHorizontal: 10
};

export const targetRepsLabel = (score) => {
  let color = 'lightest';
  if (!score || (score <= 0.8)) color = 'darkest';

  return {
    backgroundColor: 'transparent',
    color: colors.gray[color],
    fontSize: 20,
    fontWeight: '700',
  };
};

export const userRepsLabel = (score) => {
  let color = 'darkest';
  if (score) color = 'lightest';

  return {
    backgroundColor: 'transparent',
    color: colors.gray[color],
    fontSize: 20,
    fontWeight: '700',
  };
};

import { colors, fade } from 'rbv-core/colors';

const borderColor = colors.brand.primary;

export const wrapper = {};

export const titleWrapper = {
  alignItems: 'center',
  backgroundColor: colors.brand.primary,
  flex: 1,
  paddingVertical: 6
};

export const cardWrapper = {
  backgroundColor: fade(colors.canvas.primary),
  borderColor,
  borderRadius: 2,
  borderWidth: 2
};
export const cardTitle = { alignSelf: 'center' };
export const cardSubtitle = { ...cardTitle, marginBottom: 10 };

export const itemWrapper = (hasLabel) => {
  return {
    flexDirection: 'row',
    justifyContent: hasLabel ? 'space-between' : 'center'
  };
};

export const itemValue = {};

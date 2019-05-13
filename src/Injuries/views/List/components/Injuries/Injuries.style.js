import { colors, fade } from 'rbv-core/colors';

const borderColor = colors.gray.dark;

export const wrapper = {
  borderBottomWidth: 1,
  borderColor: colors.primary.desaturated
};

export const titleWrapper = (active) =>  ({
  alignItems: 'center',
  backgroundColor: active ? colors.brand.primary : 'transparent',
  flex: 1,
  paddingHorizontal: 12,
  paddingVertical: 16,
  flexDirection: 'row',
  justifyContent: 'space-between'
});

export const title = (active) => ({
  color: active ? colors.text.inverse : colors.brand.primary
});
export const count = {
  color: colors.primary.lightest,
  textAlign: 'center'
};

export const listWrapper = (active) => ({
  paddingVertical: active ? 16 : 0
});

export const cardWrapper = {
  backgroundColor: fade(colors.canvas.primary),
  borderColor,
  borderRadius: 2,
  borderWidth: 1
};

export const cardTitle = { alignSelf: 'center' };
export const cardSubtitle = { ...cardTitle, marginBottom: 10 };
export const countParen = (active) => ({
  color: active ? colors.primary.lightest : colors.primary.lighter
});
export const countNumber = (active) => ({
  color: active ? colors.text.inverse : colors.brand.primary
});
export const itemWrapper = (hasLabel) => {
  return {
    flexDirection: 'row',
    justifyContent: hasLabel ? 'space-between' : 'center'
  };
};

export const titleUnderlayColor = colors.primary.light;
export const itemValue = {};

import { colors } from 'rbv-core/colors';

export const titleWrapper = (active) =>  ({
  alignItems: 'center',
  backgroundColor: active ? colors.brand.primary : colors.canvas.primary,
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

export const countParen = (active) => ({
  color: active ? colors.primary.lightest : colors.primary.lighter
});

export const countNumber = (active) => ({
  color: active ? colors.text.inverse : colors.brand.primary
});

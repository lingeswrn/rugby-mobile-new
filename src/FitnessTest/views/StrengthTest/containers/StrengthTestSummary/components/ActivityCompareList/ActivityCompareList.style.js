import { colors, fade } from 'rbv-core/colors';

export const itemWrapper = {
  alignItems: 'center',
  backgroundColor: colors.canvas.primary,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 0,
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 10,
  paddingBottom: 10,
  borderBottomWidth: 1,
  borderColor: fade(colors.gray.primary)
};

export const itemContainer = {
  alignItems: 'center',
  flex: 1,
  flexDirection: 'column'
};

export const titleContainer = {
  ...itemContainer,
  flex: 1
};

export const itemContainerLeft = {
  ...titleContainer,
  flex: 0.85,
  alignItems: 'flex-start'
};

export const valueWrapper = {
  ...itemContainer,
  flexDirection: 'row'
};

export const value = {};

export const valuePrev = {
  ...value,
  color: colors.gray.primary,
  textDecorationLine: 'line-through',
  fontStyle: 'italic'
};

export const maxValue = {
  ...value,
  fontWeight: '600'
};

export const maxValueUp = {
  ...maxValue,
  color: colors.success.dark
};

export const maxValueDown = {
  ...maxValue,
  color: colors.brand.primary
};

export const labelContainer = {
  ...itemWrapper,
  justifyContent: 'center'
};

export const label = {
  color: colors.text.primary,
  textAlign: 'center'
};

export const maxLabelUp = {
  ...label,
  color: colors.success.light,
};
export const maxLabelDown = {
  ...label,
  color: colors.brand.primary,
};

export const labelPrev = {
  ...label,
  color: colors.gray.primary,

};

export const card = {
  marginBottom: 10
};

export const secondaryValue = {
  color: colors.primary.primary,
  fontSize: 12,
  fontStyle: 'italic'
};

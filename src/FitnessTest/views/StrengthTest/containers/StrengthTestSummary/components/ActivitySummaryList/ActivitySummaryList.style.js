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
export const repsContainer = {
  ...itemContainer,
  flex: 0.75
};
export const titleContainer = {
  ...itemContainer,
  flex: 1
};

export const itemContainerLeft = {
  ...titleContainer,
  flex: 1,
  alignItems: 'flex-start'
};

export const valueWrapper = {
  ...itemContainer,
  flexDirection: 'row'
};

export const value = {};

export const maxValue = {};

export const labelContainer = {
  ...itemWrapper,
  justifyContent: 'center'
};
export const label = {
  color: colors.primary.primary
};

export const card = {
  marginBottom: 10
};

export const secondaryValue = {
  color: colors.primary.primary,
  fontSize: 12,
  fontStyle: 'italic'
};

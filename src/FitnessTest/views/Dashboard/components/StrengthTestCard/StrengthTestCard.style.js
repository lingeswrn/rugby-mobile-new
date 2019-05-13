import { colors, fade } from 'rbv-core/colors';

export const noActivities = {
  fontStyle: 'italic',
  color: colors.gray.dark,
  padding: 12,
  marginBottom: 12
};

export const heading = {
  backgroundColor: colors.brand.primary,
  paddingVertical: 6,
  paddingHorizontal: 8,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
};

export const headingText = {
  color: colors.text.inverse
};

export const headingDate = {
  color: colors.text.inverse,
  fontSize: 12
};

export const viewHistory = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: colors.gray.primary,
  paddingHorizontal: 6,
  paddingVertical: 4
};

export const viewHistoryText = {
  fontSize: 12,
  fontStyle: 'italic',
  color: colors.white
};

export const icon = {
  paddingLeft: 4,
  paddingTop: 6,
  fontSize: 12,
  color: colors.white
};

export const itemWrapper = {
  alignItems: 'center',
  backgroundColor: colors.canvas.primary,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 0,
  paddingHorizontal: 8,
  paddingVertical: 10,
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

export const secondaryValue = {
  color: colors.primary.primary,
  fontSize: 12,
  fontStyle: 'italic'
};

import { colors } from 'rbv-core/colors';

export const itemWrapper = {
  backgroundColor: colors.canvas.primary,
  justifyContent: 'space-between',
  marginLeft: 0,
  paddingLeft: 10,
  paddingRight: 10
};

export const listSeparator = {
  height: undefined,
  paddingBottom: 6,
  paddingTop: 6,
  backgroundColor: colors.brand.primary
};

export const separatorLabel = {};

export const itemLabel = {
  color: colors.text.primary
};

export const itemValue = {
  fontSize: 14
};

export const itemValueDisabled = {
  ...itemValue,
  color: colors.text.disabled,
  fontStyle: 'italic'
};

export const itemRightContainer = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'center'
};

export const itemIcon = {
  fontSize: 14,
  color: colors.text.primary,
  marginLeft: 8,
  alignSelf: 'center',
  lineHeight: 18
};

export const itemIconDisabled = {
  ...itemIcon,
  color: 'transparent'
};

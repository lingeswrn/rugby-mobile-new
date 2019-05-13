import { colors } from 'rbv-core/colors';

export const emptyContainer = {
  display: 'flex',
  alignItems: 'center',
  padding: 36
};

export const itemWrapper = {
  backgroundColor: colors.canvas.primary,
  justifyContent: 'space-between',
  marginLeft: 0,
  paddingLeft: 10,
  paddingRight: 10
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

export const names = {
  fontSize: 14,
  color: colors.gray.dark,
  fontWeight: '200'
};

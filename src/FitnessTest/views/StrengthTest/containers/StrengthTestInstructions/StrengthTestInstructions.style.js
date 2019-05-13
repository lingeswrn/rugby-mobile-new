import { colors } from 'rbv-core/colors';

export const body = {
  backgroundColor: 'transparent',
  flex: 0,
  alignItems: 'stretch'
};

export const button = {
  alignSelf: 'center',
  width: 200
};

export const itemWrapper = {
  alignSelf: 'stretch',
  flex: 1,
  borderBottomWidth: 2,
  borderBottomColor: colors.canvas.inverse,
  paddingHorizontal: 10,
  paddingRight: 20
};

export const buttonWrapper = {
  alignSelf: 'stretch',
  justifyContent: 'flex-end',
  paddingVertical: 16,
  marginVertical: 16,
  flex: 1
};

export const bodyText = {
  flex: 1,
  flexWrap: 'wrap'
};

export const number = {
  marginRight: 12
};
export const strong = {
  fontWeight: '600'
};

export const titleWrapper = {
  backgroundColor: colors.brand.primary,
  // marginHorizontal: 25,
  alignItems: 'center',
  flex: 1,
  paddingVertical: 12
};

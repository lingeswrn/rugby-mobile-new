import { colors } from 'rbv-core/colors';

export const itemWrapper = {
  alignItems: 'center',
  backgroundColor: 'transparent',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 0,
  padding: 8,
  borderBottomColor: colors.gray.dark,
  borderBottomWidth: 0.5
};

export const statItemWrapper = {
  ...itemWrapper,
  borderBottomWidth: 0
};

export const itemContainer = {
  alignItems: 'center',
  flex: 1,
  flexDirection: 'column'
};

export const titleContainer = {
  ...itemContainer,
  flex: 3
};

export const itemContainerLeft = {
  ...titleContainer,
  alignItems: 'flex-start'
};

export const value = {
  color: colors.gray.light,
  fontSize: 18
};

export const labelContainer = {
  ...itemWrapper,
  justifyContent: 'center',
  borderBottomWidth: 0
};
export const label = {
  color: colors.gray.light,
  fontSize: 10,
  fontWeight: '200',
  textAlign: 'center'
};

export const listWrapper = {
  flex: 1,
  alignItems: 'center',
  backgroundColor: colors.gray.light
};
export const listTitle = {
  color: colors.gray.darker,
  letterSpacing: 2,
  fontWeight: '100',
  padding: 8,
  fontSize: 18
};

export const card = {
  paddingBottom: 75
};

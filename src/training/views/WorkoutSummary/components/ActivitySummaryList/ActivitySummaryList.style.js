import { colors } from 'rbv-core/colors';

export const itemWrapper = {
  borderBottomColor: colors.primary.lightest,
  borderBottomWidth: 1,
  alignItems: 'center',
  backgroundColor: 'transparent',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 0,
  padding: 8
};

export const statsWrapper = {
  alignItems: 'center',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 0,
  paddingLeft: 3
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
  flex: 1.25,
  alignItems: 'flex-start'
};

export const value = {
  color: colors.text.primary
};

export const labelContainer = {
  ...itemWrapper,
  justifyContent: 'center'
};
export const label = {
  color: colors.text.primary,
  fontSize: 10,
  fontWeight: '200',
  textAlign: 'center'
};

export const card = {
  marginBottom: 10
};

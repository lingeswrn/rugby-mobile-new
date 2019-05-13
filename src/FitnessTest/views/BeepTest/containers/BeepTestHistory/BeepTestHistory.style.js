import { colors } from 'rbv-core/colors';

export const noTests = {
  alignSelf: 'center',
  padding: 14,
  color: colors.gray.dark,
  fontStyle: 'italic'
};

export const beepTestItem = {
  flex: 1
};

export const titleContainer = {
  padding: 6,
  backgroundColor: colors.brand.primary
};

export const title = {
  paddingHorizontal: 6,
  color: colors.text.inverse
};

export const row = {
  flexDirection: 'row',
  flex: 1,
  padding: 6
};

export const levelCol = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

export const shuttleCol = {
  ...levelCol,
  borderLeftWidth: 1,
  borderColor: colors.gray.primary
};

export const itemTitle = {
  color: colors.gray.dark
};

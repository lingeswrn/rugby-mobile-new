import { colors } from 'rbv-core/colors';

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

export const emptyText = {
  fontStyle: 'italic',
  color: colors.gray.dark,
  padding: 12,
  marginBottom: 12
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

export const reTakeContainer = {
  paddingHorizontal: 14,
  paddingBottom: 10
};

export const reTakeDate = {
  color: colors.primary.primary,
  fontSize: 12,
  fontStyle: 'italic'
};

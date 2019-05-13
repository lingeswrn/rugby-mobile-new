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

export const list = {
  paddingVertical: 6
};

export const listItem = {
  backgroundColor: colors.canvas.primary,
  paddingHorizontal: 14,
  paddingTop: 8,
  paddingBottom: 12,
  borderBottomWidth: 1,
  borderColor: colors.gray.light,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
};

export const nameContainer = {
  flexDirection: 'row'
};

export const name = {
  fontSize: 12,
  fontWeight: '700'
};

export const time = {
  marginHorizontal: 12,
  fontSize: 12,
  color: colors.gray.primary
};

export const contentContainer = {
  padding: 4
};

export const content = {
  fontSize: 16
};

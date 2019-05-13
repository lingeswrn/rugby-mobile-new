import { colors, fade } from 'rbv-core/colors';

export const container = {
  backgroundColor: colors.canvas.primary,
  flex: 1,
  marginLeft: 0,
  paddingHorizontal: 16,
  paddingTop: 10,
  paddingBottom: 18,
  borderBottomWidth: 1,
  borderColor: fade(colors.gray.primary)
};

export const titleContainer = {
  flexDirection: 'row',
  alignItems: 'flex-end'
};

export const createdBy = {
  color: colors.primary.primary,
  fontSize: 12,
  fontStyle: 'italic',
  marginBottom: 4
};

export const content = {
  paddingHorizontal: 12
};

export const label = {
  fontSize: 12,
  color: colors.gray.primary,
  marginTop: 12
};

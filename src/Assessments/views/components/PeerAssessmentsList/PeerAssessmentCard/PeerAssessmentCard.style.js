import { colors, fade } from 'rbv-core/colors';


export const container = {
  backgroundColor: colors.canvas.primary,
  flex: 1,
  marginLeft: 0,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderColor: fade(colors.gray.primary)
};

export const titleRowContainer = {
  flexDirection: 'row',
  alignItems: 'center'
};

export const completedIcon = {
  color: colors.brand.success
};
export const toDoIcon = {
  color: colors.brand.primary
};

export const createdBy = {
  color: colors.primary.primary,
  fontSize: 12,
  fontStyle: 'italic',
};

export const content = {
  marginVertical: 24,
  paddingHorizontal: 12
};

export const label = {
  fontSize: 12,
  color: colors.gray.primary,
  marginTop: 12
};

export const button = {
  backgroundColor: colors.gray.darker
};

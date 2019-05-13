import { colors, fade } from 'rbv-core/colors';

export const noTests = {
  alignSelf: 'center',
  padding: 14,
  color: colors.gray.dark,
  fontStyle: 'italic'
};

export const strengthTestItem = {
  flexDirection: 'column',
  backgroundColor: colors.canvas.primary,
  flex: 1,
};

export const sectionTitle = {
  backgroundColor: colors.brand.primary,
  padding: 6
};

export const title = {
  color: colors.text.inverse
};

export const row = {
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: 10,
  paddingVertical: 5,
  borderBottomWidth: 1,
  borderColor: fade(colors.gray.primary)
};

export const titleRow = {
  ...row,
  backgroundColor: colors.gray.primary,
  borderBottomWidth: 0
};

export const col = {
  flex: 1,
  color: colors.text.primary,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 12
};

export const muscleCol = {
  ...col,
  flex: 2
};

export const titleCol = {
  ...col,
  color: colors.text.inverse,
  fontSize: 12
};

export const titleMuscleCol = {
  ...titleCol,
  flex: 2
};

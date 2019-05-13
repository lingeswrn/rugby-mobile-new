import { colors } from 'rbv-core/colors';

export const beepTestItem = {
  backgroundColor: colors.canvas.primary,
  flex: 1
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

export const text = superSize => {
  if (!superSize) return null;
  return {
    fontSize: 64
  };
};

import { colors } from 'rbv-core/colors';

export const wrapper = {
  backgroundColor: colors.canvas.primary,
  flexDirection: 'row',
  flex: 0,
  borderColor: colors.gray.darkest,
  borderTopWidth: 2,
  shadowColor: colors.canvas.inverse,
  shadowOffset: { x: -2, y: -2 },
  shadowOpacity: 0.65,
  shadowRadius: 2
};

export const container = {
  height: 150,
  flex: 1,
  borderRightWidth: 1,
  borderColor: colors.gray.darkest
};

export const label = { color: colors.text.inverse };
export const labelWrapper = {
  alignItems: 'center',
  backgroundColor: colors.gray.darkest,
  borderBottomWidth: 0.5,
  flex: 0,
  paddingHorizontal: 0,
  paddingVertical: 6
};

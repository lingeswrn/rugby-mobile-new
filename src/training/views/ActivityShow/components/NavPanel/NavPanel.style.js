import { colors } from 'rbv-core/colors';

export const wrapper = {
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderColor: colors.brand.primary,
  borderTopWidth: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  flex: 1,
  shadowColor: colors.gray.darkest,
  shadowOffset: { x: -2, y: -2 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  height: 50
};

export const wrapperGradient = [
  colors.primary.primary,
  colors.primary.dark,
];

export const icon = {
  color: colors.text.inverse,
  fontSize: 30,
  paddingTop: 0
};

export const navButton = {
  paddingVertical: 25,
  alignSelf: 'center'
};

export const doneButton = {
  alignSelf: 'center',
  backgroundColor: colors.canvas.primary,
  borderColor: colors.canvas.primary,
  marginBottom: 6,
  marginTop: -12,
  borderWidth: 0,
  borderRadius: 28,
  height: 56,
  width: 56,
  justifyContent: 'center',
  shadowColor: colors.canvas.inverse,
  shadowOpacity: 0.3,
  shadowOffset: { width: 0, height: -4 },
  shadowRadius: 4,
  paddingLeft: 4,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0
};

export const buttonIcon = {
  backgroundColor: 'transparent',
  color: colors.success.saturated,
  fontSize: 30,
  marginBottom: 0,
  marginLeft: 0,
  marginTop: 0
};

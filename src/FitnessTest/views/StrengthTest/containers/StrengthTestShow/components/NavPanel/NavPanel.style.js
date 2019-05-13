import { colors } from 'rbv-core/colors';

export const wrapper = {
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderColor: colors.primary.saturated,
  borderTopWidth: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  flex: 0,
  shadowColor: colors.gray.darkest,
  shadowOffset: { x: -2, y: -2 },
  shadowOpacity: 0.5,
  shadowRadius: 3
};
export const wrapperGradient = [
  colors.primary.primary,
  colors.primary.dark,
];

export const icon = {
  color: colors.text.inverse,
  fontSize: 42,
  paddingTop: 0
};

export const disabledIcon = {
  color: '#CCCCCCC0',
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
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: -3 },
  shadowRadius: 6,
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

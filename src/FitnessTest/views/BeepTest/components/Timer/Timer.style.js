import { colors, fade } from 'rbv-core/colors';

export const container = {
  alignItems: 'center',
  justifyContent: 'space-around',
  flex: 1
};

export const levelShuttleContainer = {
  flex: 1,
  alignItems: 'center'
};

export const level = {
  fontSize: 124,
  color: colors.text.inverse
};

export const shuttle = {
  fontSize: 90,
  marginTop: -12,
  color: colors.text.inverse
};

export const timerContainer = {
  flex: 1,
};

export const timerBox = {
  alignItems: 'center',
  height: 100,
  width: 200,
  backgroundColor: fade(colors.primary.light, 0.15),
  borderRadius: 0,
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: fade(colors.gray.lightest, 0.1),
  flex: 0
};

export const timerText = {
  fontSize: 36,
  fontWeight: '200',
  color: colors.gray.lightest
};

export const timerButton = {
  marginTop: 36
};

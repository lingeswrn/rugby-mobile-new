import { colors, fade } from 'rbv-core/colors';

export const wrapper = {
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 100,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

export const timerContainer = {
  alignItems: 'center',
  width: 150,
  height: 100,
  backgroundColor: fade(colors.primary.dark, 0.15),
  borderRadius: 0,
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: colors.brand.primary,
  flex: 0
};

export const timerButton = {
  flex: 0,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row'
};

export const timer = {
  flex: 0,
  color: colors.gray.lightest,
  fontSize: 42,
  fontWeight: '900'
};

export const label = {
  fontSize: 24,
  lineHeight: 27,
  color: colors.gray.lightest,
  fontWeight: '500'
};

export const icon = {
  color: colors.gray.lightest,
  marginLeft: 8,
  marginTop: 2
};

export const skipButton = {
  marginTop: 12,
  borderWidth: 2,
  alignItems: 'center',
  alignSelf: 'center'
};

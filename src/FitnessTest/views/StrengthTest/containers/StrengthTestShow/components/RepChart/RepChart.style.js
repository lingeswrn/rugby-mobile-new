import { colors } from 'rbv-core/colors';

export const barWrapper = {
  flex: 1,
  paddingHorizontal: 5,
  paddingTop: 15,
  alignItems: 'center',
  alignSelf: 'stretch'
};

export const chartWrapper = {
  flexDirection: 'row',
  paddingHorizontal: 10
};

export const targetRepsLabel = {
  color: colors.gray.lightest,
  letterSpacing: 2,
  fontWeight: '100',
  marginBottom: 8
};

export const userRepsLabel = {
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'transparent',
  color: colors.gray.lightest
};

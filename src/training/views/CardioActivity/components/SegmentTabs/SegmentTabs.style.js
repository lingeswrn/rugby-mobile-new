import { colors } from 'rbv-core/colors';

export const wrapper = {
  flexDirection: 'row',
  flex: 1,
  height: 42
};

export const segmentWrapper = {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  borderBottomColor: colors.gray.darker,
  borderBottomWidth: 0.5,
  borderRightColor: colors.gray.darker,
  borderRightWidth: 0.5,
  backgroundColor: colors.canvas.primary
};

export const segmentTitle = {
  fontSize: 22
};

export const segmentTitleActive = {
  color: colors.text.inverse,
  fontSize: 28
};

export const segmentWrapperActive = {
  ...segmentWrapper,
  backgroundColor: colors.brand.primary
};

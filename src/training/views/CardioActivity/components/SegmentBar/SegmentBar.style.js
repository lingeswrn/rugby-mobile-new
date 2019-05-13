import { colors } from 'rbv-core/colors';

export const wrapper = {
  backgroundColor: colors.canvas.inverse,
  flex: 1,
  paddingVertical: 12
};

export const segmentTitleContainer = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  marginBottom: 4
};

export const segmentTitle = {
  alignSelf: 'flex-end',
  lineHeight: 44,
  fontSize: 40,
  color: colors.text.inverse
};

export const segmentTitleSmall = {
  ...segmentTitle,
  fontSize: 28
};

export const itemListContainer = {
  flexDirection: 'row'
};
export const itemWrapper = {
  alignItems: 'center'
};

export const itemLabel = {
  color: colors.text.inverse,
  letterSpacing: 1.5
};

export const itemValue = {
  color: colors.text.inverse
};

import { colors } from 'rbv-core/colors';

export const wrapper = {};

export const cardWrapper = {
  display: 'flex',
  backgroundColor: colors.canvas.primary,
  flex: 1,
  flexDirection: 'column',
  paddingHorizontal: 12,
  paddingBottom: 24,
};

export const statusWrapper = {
  alignItems: 'center',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end'
};

export const statusIcon = {
  marginTop: 6,
  fontSize: 14,
  color: colors.brand.success,
  marginLeft: 8
};

export const rowContainer = {
  alignItems: 'center',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: 50
};

export const valueWrapper = {
  alignItems: 'flex-end',
  alignSelf: 'center',
  justifyContent: 'center'
};

export const itemLabel = {
  color: colors.text.primary,
  fontSize: 14,
  fontWeight: '100'
};

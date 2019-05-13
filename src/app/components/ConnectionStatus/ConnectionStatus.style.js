import { colors } from 'rbv-core/colors';

/* controls rendering of rest of screen. DNFWI */
export const wrapper = {};

/* outermost View */
export const container = {
  alignItems: 'stretch',
  backgroundColor: colors.info.primary,
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  paddingVertical: 4,

  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0
};

/* main element containers, controls widths, primarily */
export const textWrapper = {
  paddingHorizontal: 6,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
};
export const retryButtonWrapper = {
  flex: 0,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 6
};


/* content */
export const text = {
  textAlign: 'left',
  color: colors.text.inverse
};
export const retryLabel = {
  alignSelf: 'center',
  color: colors.text.inverse
};

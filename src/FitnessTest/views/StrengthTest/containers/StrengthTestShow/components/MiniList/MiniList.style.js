import { colors } from 'rbv-core/colors';


export const itemWrapper = {
  alignItems: 'center',
  backgroundColor: colors.canvas.primary,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 0,
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 5,
  paddingBottom: 5,
  borderColor: colors.gray.dark,
  borderBottomWidth: 1,
  height: 50
};

export const wrapper = {
  flex: 1
  // height: itemWrapper.height * 3
};

export const itemWrapperUpcoming = {
  ...itemWrapper,
  backgroundColor: colors.canvas.primary,
};

export const itemWrapperCurrent = {
  ...itemWrapper,
  backgroundColor: colors.primary.primary
};

export const itemWrapperComplete = {
  ...itemWrapper,
  backgroundColor: 'transparent'
};

export const itemContainer = {
  alignItems: 'center',
  flex: 1,
  flexDirection: 'column'
};

export const titleContainer = {
  ...itemContainer,
  flex: 1
};

export const itemContainerLeft = {
  ...titleContainer,
  flex: 1,
  alignItems: 'flex-start'
};

export const valueWrapper = {
  ...itemContainer,
  flexDirection: 'row'
};

export const value = {
  color: colors.text.inverse,
  letterSpacing: 1.25
};

export const maxValue = {
  ...value
};
export const labelContainer = {
  ...itemWrapper,
  justifyContent: 'center'
};
export const label = {
  color: colors.text.inverse,
  textAlign: 'center'
};

export const textDisabled = {
  color: colors.text.primary
};
export const textSuccess = {
  color: colors.gray.primary
};

export const valueSuccess = {
  ...textSuccess,
  textDecorationLine: 'line-through'
};
export const card = {
  marginBottom: 10
};

export const secondaryValue = {
  color: colors.primary.desaturated,
  fontSize: 9,
  fontWeight: '500'
};
export const labelRowWrapper = {
  backgroundColor: colors.tertiary.darker,
  flex: 0,
  flexDirection: 'row',
  height: 'auto',
  paddingVertical: 6,
  paddingLeft: 8,
  paddingRight: 8,
};

export const labelRowContainerLeft = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
};
export const labelRowContainerRight = {
  justifyContent: 'space-between',
  ...labelRowContainerLeft
};

export const colLabelWrapper = { flex: 1 };

export const colLabel = (len) => ({
  textAlign: len === 1 ? 'left' : 'center',
  flex: 1
});

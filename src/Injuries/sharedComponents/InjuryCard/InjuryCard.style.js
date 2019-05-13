import { colors } from 'rbv-core/colors';

export const wrapper = {
  flex: 1,
  height: 140,
  justifyContent: 'space-between',
  marginHorizontal: 10,
  marginVertical: 5,
  paddingHorizontal: 12,
  paddingVertical: 10
};
export const frontContainer = {
  flex: 1
};

export const title = {
  alignSelf: 'center'
};
export const subtitle = {
  ...title,
  color: colors.gray.primary,
  fontSize: 18,
  marginBottom: 10,
  fontStyle: 'italic'
};

export const itemWrapper = (hasLabel) => {
  return {
    flexDirection: 'row',
    justifyContent: hasLabel ? 'space-between' : 'center'
  };
};
export const frontWrapper = {};
export const itemValue = {};

export const backWrapper = {
  alignItems: 'center',
  justifyContent: 'space-between'
};

export const backContainer = {
  alignItems: 'flex-end',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center'
};

export const backSideButton = {
  marginHorizontal: 18
};

export const footer = {
  flex: 1,
  alignSelf: 'stretch',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-end'
};
export const footerSectionWrapper = {
  flex: 0,
  flexDirection: 'row',
  marginTop: 10
};
export const footerLabel = { marginRight: 10 };

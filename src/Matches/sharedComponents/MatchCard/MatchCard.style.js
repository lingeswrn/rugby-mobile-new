import { colors } from 'rbv-core/colors';

export const wrapper = {
  justifyContent: 'space-between',
  marginHorizontal: 10,
  marginVertical: 5,
  paddingHorizontal: 12,
  paddingVertical: 10,
};

export const title = { alignSelf: 'center' };
export const subtitleContainer = {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  marginBottom: 10
};
export const subtitle = {  };
export const locationType = {
  fontSize: 18,
  lineHeight: 18,
  marginLeft: 8,
  fontWeight: '200'
};

export const itemWrapper = (hasLabel) => {
  return {
    flexDirection: 'row',
    justifyContent: hasLabel ? 'space-between' : 'center'
  };
};

export const itemValue = {};

export const backWrapper = { alignItems: 'center' };

export const backContainer = {
  alignItems: 'center',
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'center'
};

export const backSideButton = {
  marginHorizontal: 18
};

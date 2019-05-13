import { colors } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const {  height } = Dimensions.get('window');

export const viewWrapper = {};

export const titleWrapper = {
  flex: 0,
  height: 55,
  backgroundColor: colors.brand.primary,
  alignItems: 'center',
  justifyContent: 'center'
};
export const cardWrapper = {
  justifyContent: 'flex-start'
};

export const cardContainer = {
  justifyContent: 'flex-start',
  // marginHorizontal: 30,
  marginHorizontal: 0,
  borderColor: colors.gray.light,
  borderWidth: 1,
  borderTopWidth: 0
};

// export const cardWidth = width;
export const cardHeight = height - 62;

export const refresh = {
  backgroundColor: colors.canvas.primary,
  tintColor: colors.brand.primary,
  titleColor: colors.text.primary
};

import { colors } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const {  height, width } = Dimensions.get('window');


export const viewWrapper = {};

export const titleWrapper = {
  flex: 0,
  height: 55,
  backgroundColor: colors.brand.primary,
  alignItems: 'center',
  justifyContent: 'center'
};

export const cardContainer = {
  paddingHorizontal: 25,
  flex: 1,
  justifyContent: 'flex-start'
};

export const cardWidth = width;
export const cardHeight = height - 62;

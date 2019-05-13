import { colors, fade } from 'rbv-core/colors';
import { StyleSheet } from 'react-native';

export const pagination = {
  paginationStyle: { paddingVertical: 16 },
  activeDotColor: colors.gray.lightest,
  dotColor: fade(colors.gray.lighter),
  activeDotStyle: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 8 },
  dotStyle: { width: 4, height: 4, borderRadius: 2, marginHorizontal: 8 }
};
export const container = { /* flex: 1 */ };
export const slideContainer = {
  flex: 1
};
export const slideContentCntainer =  {
  borderWidth: 0,
  borderColor: 'white',
};

export const gradColors = [colors.primary.saturated, colors.primary.dark];
export const genStyle =  StyleSheet.create({
  gradient: { ...StyleSheet.absoluteFillObject },


});

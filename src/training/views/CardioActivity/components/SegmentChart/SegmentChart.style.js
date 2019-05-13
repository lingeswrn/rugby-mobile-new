import Color from 'color';
import { Dimensions } from 'react-native';
import { colors } from 'rbv-core/colors';

export const chartWidth = Dimensions.get('window').width - 20;
export const barColorHex = Color(colors.brand.primary).hex();
export const barColorRGB = Color(colors.gray.primary).rgb().object();
export const activeBarColorRGB = Color(colors.brand.primary).rgb().object();
export const stroke = {
  color: Color(colors.brand.primary).hex(),
  alpha: 1,
};
export const barColor = colors.brand.primary;
export const wrapper = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: 'transparent',
  paddingTop: 0,
  paddingBottom: 0
};

export const label = {
  display: 'none'
};

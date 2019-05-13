import _ from 'lodash';
import Color from 'color';
import { colors } from 'rbv-core/colors';
import { Platform } from 'react-native';

const a = Platform.OS === 'ios' ? 0.92 : 1;

const barText = _.concat(Color(colors.text.inverse).rgb().array(), 1);
const barBg = _.concat(Color(colors.gray.darkest).rgb().array(), 1);
const pickerBg = _.concat(Color(colors.canvas.primary).rgb().array(), a);
const pickerColor = _.concat(Color(colors.text.primary).rgb().array(), 1);

export const pickerColors = {
  pickerConfirmBtnColor: barText,
  pickerCancelBtnColor: barText,
  pickerToolBarBg: barBg,
  pickerBg,
  pickerFontColor: pickerColor,
  pickerToolBarFontSize: 18,
  pickerFontSize: Platform.OS === 'ios' ? 24 : 18,
  pickerRowHeight: 32
};

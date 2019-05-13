import _ from 'lodash';
import Color from 'color';
import { colors } from 'rbv-core/colors';
import { Platform } from 'react-native';

export const wrapper = {
  alignItems: 'center',
  backgroundColor: colors.canvas.inverse,
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 12,
  paddingHorizontal: 10,
  height: 50
};

export const iconWrapper = {
  backgroundColor: wrapper.backgroundColor,
  flex: 0,
  alignSelf: 'stretch',
  justifyContent: 'center',
  marginVertical: 0,
  marginLeft: 0
};

export const icon = {
  color: colors.text.inverse,
  fontSize: 22,
  marginRight: 0
};

export const title = {
  color: colors.text.inverse
};

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
  pickerFontSize: 18,
  // pickerFontSize: Platform.OS === 'ios' ? 24 : 18,
  pickerRowHeight: 24
};

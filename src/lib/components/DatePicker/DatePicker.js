/** MS 2017-04-28
 * customStyles/appearance docs:
 * https://github.com/xgfe/react-native-datepicker#property-customstyles-available-keys
 */
import * as sty from './DatePicker.style';
import React from 'react';
import NativeDatePicker from 'react-native-datepicker';
import { View } from 'native-base';

export const DatePicker = (props) => {
  const {
    containerStyle, input: { value, onChange }, meta: { submitting }, ...rest
  } = props;
  return (
    <View style={ sty.wrapper }>
      <NativeDatePicker
        style={{ ...sty.container, ...containerStyle }}
        date={ value }
        onDateChange={ onChange }
        disabled={ submitting }
        { ...rest }
      />
    </View>
  );
};

DatePicker.defaultProps = {
  androidMode: 'default',
  cancelBtnText: 'Cancel',
  confirmBtnText: 'Confirm',
  containerStyle: {},
  customStyles: sty.customStyles,
  format: 'YYYY-MM-DD',
  maxDate: '2002-01-01',
  minDate: '1900-01-01',
  mode: 'date',
  showIcon: false
};

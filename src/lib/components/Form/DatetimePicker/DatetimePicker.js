import * as sty from './DatetimePicker.style';
import React, { Component } from 'react';
import moment from 'moment';
import Base from 'react-native-modal-datetime-picker';
import { Input } from '../Input';
import { View } from 'native-base';

export class DatetimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.input;
  }

  handleChange = (date) => {
    const mome = moment(date, this.props.format);
    const val = mome.isValid() ? mome.format(this.props.parseFormat) : date;
    this.handleClose(() => { this.props.input.onChange(val); });
  }
  handleClose = (cb) => this.setState({ open: false }, cb);
  handleOpen = () => this.setState({ open: true });

  render() {
    const { open } = this.state;
    const { iconName, input, input: { value }, label, ...rest } = this.props;
    const isValid = moment(value).isValid();
    return (
      <View style={ sty.wrapper }>
        <Input
          iconName={ iconName }
          defaultValue={
            isValid ? moment(value).format(this.props.format) : undefined
          }
          editable={ !open }
          label={ label }
          onChangeText={ () => this.input.blur() }
          onFocus={ this.handleOpen }
          ref={ (ref) => { this.input = ref; } }
          useNativeDriver
          value={
            isValid ? moment(value).format(this.props.format) : undefined }
          input={ input }
          { ...rest }
        />
        <Base
          date={ isValid ? moment(value).toDate() : undefined }
          isVisible={ this.state.open }
          onConfirm={ this.handleChange }
          onCancel={ this.handleClose }
          { ...rest }
        />
      </View>
    );
  }
}

DatetimePicker.defaultProps = {
  // datePickerModeAndroid: 'spinner',
  format: 'ddd, D MMMM, YYYY',
  parseFormat: 'YYYY-MM-DD',
  mode: 'date',
  iconName: 'calendar'
};

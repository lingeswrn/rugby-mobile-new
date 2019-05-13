import * as sty from './NumberPicker.style';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import _ from 'lodash';
import numeral from 'numeral';
import PickerBase from 'react-native-picker';
import { Input } from '../Input';

export class NumberPicker extends Component {
  constructor(props) {
    super(props);
    const { min, max, input: { value }, interval, format } = props;


    /* make the whole number stuff */
    const nums = _.concat([''], _.range(min, (max + 1), interval));
    let opts = _.map(nums, _.toString);
    let emptyVal = [''];
    /* make the decimal stuff */
    const hasDecimal = _.includes(format, '.');
    if (hasDecimal) {
      const places = _.split(format, '.')[1].length;
      const rangeOptions = _.concat([''], _.range((10 ^ places) - 1));
      opts = [opts, ['.'], _.map(rangeOptions, _.toString)];
      emptyVal = _.concat(emptyVal, '.', _.times(places, _.constant('')));
    }
    /* establish formatters */

    /* accepts: number; returns: array */
    this.format = (val) => {
      if (!val) return emptyVal;
      /* make sure value is in range */
      const validated = _.inRange(val, min, max) ? val : _.clamp(val, min, max);
      /* format to string */
      const toFormat = numeral(validated).format(format);
      /* if there's a decimal, split into integers and decimals */
      if (hasDecimal) {
        const [int, dec] = _.split(toFormat, '.');
        return [int, '.', dec];
      }
      /* otherwise just return the formatted string */
      return [toFormat];
    };

    /* accepts: array; returns: number */
    this.parse = (val) => {
      if (val === emptyVal) return null;
      return numeral(_.join(val, '')).value();
    };

    /* accepts: number; returns: string */
    this.formatForInput = (val) => val ? numeral(val).format(format) : '';

    /* set initial values */
    const pickerValue = _.isEmpty(value) ? emptyVal : this.format(value);
    const formValue = _.isEmpty(value) ? null : value;
    const inputValue = this.formatForInput(formValue);
    this.state = {
      emptyVal,
      hasDecimal,
      open: false,
      picker: PickerBase,
      pickerData: opts,
      pickerValue,
      formValue,
      inputValue
    };
  }

  handleChange = (pickerValue) => {
    const formValue = this.parse(pickerValue);
    const inputValue = this.formatForInput(formValue);

    this.setState({
      open: false,
      pickerValue,
      formValue,
      inputValue
    }, () => {
      this.state.picker.hide();
      this.props.input.onChange(formValue);
    });
  }

  handleCancel = () => {
    this.state.picker.hide();
    this.setState({ open: false });
  };

  handleOpen = () => {
    Keyboard.dismiss();

    const { picker, pickerData, pickerValue } = this.state;
    picker.init({
      pickerData,
      onPickCancel: this.handleCancel,
      onPickerConfirm: this.handleChange,
      pickerConfirmBtnText: 'Done',
      pickerCancelBtnText: 'Cancel',
      pickerTitleText: '',
      selectedValue: pickerValue,
      /*
       * Fiddle with these if it looks terrible. Default is [1, 1, 1].
       * I can't be certain, but I'm pretty sure it's:
       * [flexGrow, flexShrink, flexBasis]
       * IDK tho. This thing is a real piece of work.
       */
      wheelFlex: [0.1, 0.025, 0.1],
      ...sty.pickerColors
    });

    picker.show();
    this.setState({ open: true });
  }


  render() {
    const { inputValue } = this.state;
    const { iconName, label, ...rest } = this.props;
    return (
      <Input
        iconName={ iconName }
        defaultValue={ inputValue }
        label={ label }
        onFocus={ this.handleOpen }
        useNativeDriver
        value={ inputValue }
        { ...rest }
      />
    );
  }
  componentWillUnmount() { this.state.picker.hide(); }
}

NumberPicker.defaultProps = {
  min: 1,
  max: 10,
  interval: 1,
  format: '0',
  iconName: 'tasks'
};
NumberPicker.propTypes = {
  format: PropTypes.oneOf(['0', '0.0', '0.00']),
  interval: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
};

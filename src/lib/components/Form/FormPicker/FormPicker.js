import * as sty from './FormPicker.style';
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import _ from 'lodash';
import PickerBase from 'react-native-picker';
import { Input } from '../Input';

export class FormPicker extends Component {
  constructor(props) {
    super(props);
    const { options, valueKey = 'key', labelKey = 'label' } = props;
    const opts = _.concat([{ [valueKey]: null, [labelKey]: '' }],
      _.map(options, (opt) =>
        _.isObject(opt) ? opt : { [valueKey]: opt, [labelKey]: opt }
      ));
    this.state = {
      valueKey,
      labelKey,
      open: false,
      options: opts,
      picker: PickerBase,
      pickerData: _.map(opts, (opt) => opt[labelKey]),
      selectedValue: undefined,
      selected: _.isEmpty(props.input.value) ? null : props.input.value
    };
  }

  format = (val) => {
    const found = _.find(this.state.options, { [this.state.valueKey]: val });
    return found ? found[this.state.labelKey] : null;
  }

  parse = (val) => _.find(this.state.options, {
    [this.state.labelKey]: val
  })[this.state.valueKey]

  setFormValue = (val) => {
    this.state.picker.hide();
    this.props.input.onChange(val);
  }

  handleChange = ([selectedValue]) => {
    const selected = this.parse(selectedValue);
    this.setState({ open: false, selected });
    this.setFormValue(selected);
  }

  handleCancel = () => {
    this.state.picker.hide();
    this.setState({ open: false });
  };

  handleOpen = () => {
    const { picker, pickerData, selected } = this.state;
    const selectedValue = this.format(selected);
    const isValid = (_.indexOf(pickerData, selectedValue) >= 0);
    const value = isValid ? [selectedValue] : undefined;

    Keyboard.dismiss();

    picker.init({
      pickerData,
      onPickCancel: this.handleCancel,
      onPickerConfirm: this.handleChange,
      pickerConfirmBtnText: 'Done',
      pickerCancelBtnText: 'Cancel',
      pickerTitleText: '',
      pickerTextEllipsisLen: 30,
      selectedValue: value,
      pickerFontFamily: 'System',
      ...sty.pickerColors
    });

    picker.show();
    this.setState({ open: true });
  }


  render() {
    const { selected } = this.state;
    const { iconName, label, ...rest } = this.props;
    const value = this.format(selected);
    return (
      <Input
        iconName={ iconName }
        defaultValue={ value }
        label={ label }
        onFocus={ this.handleOpen }
        useNativeDriver
        value={ value }
        { ...rest }
      />
    );
  }
  componentWillUnmount() { this.state.picker.hide(); }
}

FormPicker.defaultProps = {
  options: [],
  iconName: 'tasks',
  labelKey: 'label'
};

import * as sty from './ActivityPicker.style';

import React, { Component } from 'react';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native';
import { Icon, View } from 'native-base';
import { Text } from 'src/lib/components';
import PickerBase from 'react-native-picker';

export class ActivityPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      picker: PickerBase,
      selectedTemplate: _.find(props.items, { _id: props.selected })
    };
  }

  handleChange = ([name]) => {
    this.state.picker.hide();
    const { items } = this.props;
    const selectedTemplate = _.find(items, { name });
    this.setState({ selectedTemplate, open: false });
    this.props.onValueChange(selectedTemplate._id);
  }

  handleOpen = () => {
    const { items } = this.props;
    const { picker, selectedTemplate = {}} = this.state;
    picker.init({
      pickerData: _.map(items, ({ name }) => name),
      onPickCancel: this.handleCancel,
      onPickerConfirm: this.handleChange,
      pickerConfirmBtnText: 'Done',
      pickerCancelBtnText: 'Cancel',
      pickerTextEllipsisLen: 30,
      pickerTitleText: '',
      selectedValue: [selectedTemplate.name],
      ...sty.pickerColors
    });
    picker.show();
    this.setState({ open: true });
  }
  handleCancel = () => {
    this.setState({ open: false }, this.state.picker.hide);
  };
  componentWillReceiveProps(nextProps) {
    const { items, selected } = nextProps;
    // if (index !== this.props.index) {
    this.setState({ selectedTemplate: _.find(items, { _id: selected }) });
    // }
  }

  render() {
    const { selectedTemplate } = this.state;
    const name = _.isUndefined(selectedTemplate) ? 'workout' : selectedTemplate.name;

    return (
      <TouchableOpacity activeOpacity={ 0.8 }
        style={ sty.wrapper }
        onPress={ this.handleOpen }
      >
        <Text h4 inverse>{ name }</Text>
        <View style={ sty.iconWrapper }>
          <Icon name='angle-down' style={ sty.icon } />
        </View>
      </TouchableOpacity>

    );
  }
}

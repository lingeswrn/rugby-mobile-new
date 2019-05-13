import * as sty from './IconInput.style';
import React, { Component } from 'react';
import {
  isEmpty as _isEmpty,
  has as _has,
} from 'lodash';

import {
  Item,
  Input as NativeInput,
  Icon,
  View,
  Text
} from 'native-base';

export class IconInput extends Component {
  constructor(props) {
    super(props);
  }

  renderErrorText() {
    const { meta: { touched, error = {}}} = this.props;
    const hasError = touched && !_isEmpty(error);
    if (hasError) {
      return (
        <View style={ sty.errorWrapper }>
          <Text style={ sty.errorText }>
            { typeof error === 'object' ? error.message : error }
          </Text>
        </View>
      );
    }
    return null;
  }
  render() {
    const {
      containerStyle = {},
      input,
      last = false,
      meta: { touched, error = {}},
      style = {},
      icon = 'pied-piper',
      iconStyle = {},
      inputWrapper = {},
      underline = false,
      ...rest
    } = this.props;
    const hasError = touched && !_isEmpty(error);
    const dynamicIconStyle = hasError ? sty.iconStyleError : sty.iconStyle;
    return (
      <View style={{ ...sty.inputWrapper, ...inputWrapper }}>
        <Item
          last={ last }
          style={{ ...sty.textInputContainer, ...containerStyle }}
          error={ hasError }
        >
          <View style={ sty.iconWrapper }>
            <Icon
              name={ icon }
              style={{ ...dynamicIconStyle, ...iconStyle }}
            />
          </View>
          <NativeInput
            { ...input }
            value={ this.props.input.value }
            onChangeText={ (text) => this.props.input.onChange(text) }
            placeholderLabel={ this.props.placeholder }
            placeholderTextColor={
              _has(iconStyle, 'color') ?
                iconStyle.color : sty.iconStyle.color
            }
            style={{ ...sty.textInput, ...style }}
            underline={ underline }
            { ...rest }
          />
        </Item>
        { this.renderErrorText() }
      </View>
    );
  }
}

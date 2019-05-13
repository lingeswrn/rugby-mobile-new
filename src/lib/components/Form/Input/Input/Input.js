import * as sty from './Input.style';
import React, { Component } from 'react';
import _ from 'lodash';
import { View } from 'native-base';
import { Text } from 'src/lib/components';
import { Kohana } from 'react-native-textinput-effects';

export class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      iconName,
      input: { value, ...input },
      inverse,
      label,
      meta: { active, touched, error = {}, submitting },
      units,
      wrapperStyle,
      inputStyle = {},
      ...rest
    } = this.props;
    const hasError = touched && !_.isEmpty(error);
    const style = sty.inputStyles(inverse);
    return (
      <View style={ [style.wrapper, wrapperStyle] }>
        <Kohana { ...style.icon }
          defaultValue={ value }
          disabled={ submitting }
          iconContainerStyle={ style.iconContainer }
          iconName={ iconName }
          inputStyle={{ ...style.input, ...inputStyle }}
          underlineColorAndroid='#DE2629'
          selectionColor='#DE2629'
          label={ label }
          labelStyle={ style.label }
          useNativeDriver
          value={ value }
          { ...input }
          { ...rest }
          style={ style.container }
        />
        { units && (active || value) ?
          <Text style={ style.units }>{ units }</Text> : null
        }
        <View style={ style.errorWrapper }>
          <Text style={ style.errorText }>
            { hasError ? typeof error === 'object' ? error.message : error : '' }
          </Text>
        </View>
      </View>
    );
  }
}

Input.defaultProps = {
  style: {},
  wrapperStyle: {},
  iconName: 'pied-piper',
  inverse: false
};

// import * as sty from './TextInput.style';
import React, { Component } from 'react';
import { map as _map } from 'lodash';

import { View } from 'native-base';
import { TextInput } from './TextInput';

export class MultiTextInput extends Component {
  constructor(props) {
    super(props);
  }

  renderInputs() {
    const {
      onChange,
      item: { fields },
      value
    } = this.props;
    return _map(fields, ({ pick, label }) => {
      return (
        <TextInput
          key={ pick }
          onChange={ (val) => onChange({ ...value, [pick]: val }) }
          item={{ label }}
          value={ value[pick] }
        />
      );
    });
  }

  render() {
    return (
      <View>
        { this.renderInputs() }
      </View>
    );
  }
}

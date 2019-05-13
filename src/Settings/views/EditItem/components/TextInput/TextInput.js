import * as sty from './TextInput.style';
import React, { Component } from 'react';
import _ from 'lodash';
import { Input, Item, Label, View } from 'native-base';

export class TextInput extends Component {
  constructor(props) { super(props); }

  render() {
    const { onChange, item: { label, type }, value } = this.props;
    return (
      <View style={ sty.wrapper }>
        <Item inlineLabel
          style={ sty.inputContainer }
        >
          <Label style={ sty.label }>{ label }</Label>
          <Input
            autoFocus
            // placeholder={ label }
            value={ (type === 'number' && value) ? value.toString() : value }
            onChangeText={ type === 'number' ?
              (val) => onChange(_.parseInt(val)) : onChange
            }
          />
        </Item>
      </View>
    );
  }
}

import * as sty from './Enum.style';
import React, { Component } from 'react';
import {
  isObject as _isObject,
  map as _map,
  startCase as _startCase
} from 'lodash';
import { Icon, List, ListItem, Text, View } from 'native-base';

export class Enum extends Component {
  constructor(props) {
    super(props);
  }

  renderOptions(options) {
    const { value: currentValue } = this.props;
    return _map(options, (option) => {
      let label = _startCase(option);
      let value = option;
      if (_isObject(option)) {
        label = option.label;
        value = option.value;
      }
      const active = currentValue === value;
      const style = sty.item(active);
      return(
        <ListItem
          key={ value }
          onPress={ () => this.props.onChange(value) }
          style={ style.wrapper }
        >
          <View>
            <Text style={ style.value }>{ label }</Text>
          </View>
          <View style={ sty.iconRightContainer }>
            { active ? <Icon style={ style.icon } name='check' /> : null }
          </View>
        </ListItem>
      );
    });
  }
  //
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.value !== nextProps.value) return true;
  //   return false;
  // }

  render() {
    const { options } = this.props.item;
    return (
      <View style={ sty.wrapper }>
        <List>{ this.renderOptions(options) }</List>
      </View>
    );
  }
}

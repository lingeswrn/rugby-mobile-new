import * as sty from './Picker.style';
import React, { Component } from 'react';
import { View } from 'native-base';
import _ from 'lodash';
import PickerBase from 'rmc-picker';

export class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  setItems(initialItems) {
    const items = _.map(initialItems, (item) => {
      if (_.isNumber(item)) return { label: item.toString(), value: item };
      return { label: item, value: item };
    });
    this.setState({ items });
  }

  componentWillMount() { this.setItems(this.props.items); }

  renderItems() {
    const { items } = this.state;
    if (_.isEmpty(items)) return null;
    return _.map(items, ({ label, value }) => (
      <PickerBase.Item key={ value } value={ value }>
        { label }
      </PickerBase.Item>
    ));
  }

  render() {
    const { itemStyle, value } = this.props;
    return (
      <View style={ sty.container }>
        <PickerBase
          selectedValue={ value ? _.toString(value) : '' }
          onValueChange={ (val) =>  this.props.onChange(_.parseInt(val)) }
          style={ sty.picker }
          indicatorStyle={ sty.indicator }
          itemStyle={{ ...sty.item, ...itemStyle }}
        >
          { this.renderItems() }
        </PickerBase>
      </View>
    );
  }
}

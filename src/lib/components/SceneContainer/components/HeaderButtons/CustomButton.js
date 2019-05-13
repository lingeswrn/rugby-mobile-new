import * as sty from './HeaderButtons.style';

import React, { Component } from 'react';
import { withRouter } from 'react-router-native';
import { Button, Icon, Text } from 'native-base';

class Custom extends Component {
  constructor(props) {
    super(props);
  }

  getStyle(type) {
    const { disabled, style } = this.props;
    if (disabled) return sty[`${type}Disabled`];
    return {
      ...sty[type],
      ...style
    };
  }

  renderButtonContent() {
    const { text, icon = 'pied-piper' } = this.props;
    if (text) {
      return <Text style={ this.getStyle('text') }>{ text }</Text>;
    }
    return(
      <Icon
        style={ this.getStyle('icon') }
        name={ icon } />
    );
  }

  onPress = this.props.to ?
    () => this.props.history.push(this.props.to) :
    this.props.onPress

  render() {
    return (
      <Button
        transparent
        onPress={ this.onPress }
      >
        { this.renderButtonContent() }
      </Button>
    );
  }
}

export const CustomButton = withRouter(Custom);

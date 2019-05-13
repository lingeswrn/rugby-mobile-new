import * as sty from './InjuryBanner.style';
import React, { Component } from 'react';
import { Icon } from 'native-base';
import { Text } from 'src/lib/components/Text';
import Collapse from 'react-native-collapsible';

export class InjuryBanner extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  handleClose = () => { this.setState({ open: false }); }
  get label() {
    const { injuryLimits: { cardio, weightlifting }} = this.props;
    switch (true) {
      case weightlifting && !cardio: return 'cardio';
      case !weightlifting && cardio: return 'lifting';
      default: return 'workout';
    }
  }
  render() {
    const { open } = this.state;
    const { hasInjury } = this.props;
    if (!hasInjury) return null;
    return (
      <Collapse collapsed={ !open }  style={ sty.wrapper }>
        <Icon style={ sty.icon } name='exclamation-triangle' />
        <Text h3 style={ sty.header }>
          { `injury: ${this.label} disabled` }
        </Text>
        <Icon style={ sty.iconClose }
          name='times-circle'
          onPress={ this.handleClose }
        />
      </Collapse>
    );
  }
}

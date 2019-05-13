import * as sty from './SegmentTabs.style';
import React, { Component } from 'react';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';

export class SegmentTabs extends Component {
  constructor(props) {
    super(props);
  }

  renderWarmup() {
    const { addWarmup } = this.props.activity.cardioProfile;
    const{ isWarmup } = this.props.activeSegment;
    const style = isWarmup ?
      { wrapper: sty.segmentWrapperActive, text: sty.segmentTitleActive } :
      { wrapper: sty.segmentWrapper, text: sty.segmentTitle };

    if (addWarmup) {
      return (
        <View style={ style.wrapper }>
          <Text h5 style={ style.text }>{ 'WARMUP' }</Text>
        </View>
      );
    }
    return null;
  }

  renderCooldown() {
    const { addCooldown } = this.props.activity.cardioProfile;
    const{ isCooldown } = this.props.activeSegment;
    const style = isCooldown ?
      { wrapper: sty.segmentWrapperActive, text: sty.segmentTitleActive } :
      { wrapper: sty.segmentWrapper, text: sty.segmentTitle };

    if (addCooldown) {
      return (
        <View style={ style.wrapper }>
          <Text h5 style={ style.text }>{ 'COOLDOWN' }</Text>
        </View>
      );
    }
    return null;
  }
  render() {
    const{ isTraining } = this.props.activeSegment;
    const style = isTraining ?
      { wrapper: sty.segmentWrapperActive, text: sty.segmentTitleActive } :
      { wrapper: sty.segmentWrapper, text: sty.segmentTitle };
    return (
      <View style={ sty.wrapper }>
        { this.renderWarmup() }
        <View style={ style.wrapper }>
          <Text h5 style={ style.text }>{ 'TRAINING' }</Text>
        </View>
        { this.renderCooldown() }
      </View>
    );
  }
}

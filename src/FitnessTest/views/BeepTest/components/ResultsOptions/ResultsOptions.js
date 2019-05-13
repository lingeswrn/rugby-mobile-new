import * as sty from './ResultsOptions.style';
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'src/lib/components';

export class ResultsOptions extends Component {
  getMaxShuttles(level) {
    const speed = level === 1 ? 8 * 5 / 18 : (8.5 + 0.5 * (level - 1)) * 5 / 18;
    // distance run over the entire level (meters) FUN MATH
    const levelDistance = speed * 60 + 20 - (speed * 60) % 20;
    // the number of shuttles in the level
    const shuttlesPerLevel = levelDistance / 20;
    return shuttlesPerLevel;
  }

  getLevelShuttle(rawShuttle) {
    const { level } = this.props.results;
    if (rawShuttle > 0) return { level, shuttle: rawShuttle };
    if (level - 1 === 0) return {};
    return {
      level: level - 1,
      shuttle: this.getMaxShuttles(level - 1) + rawShuttle
    };
  }

  renderButton(rawShuttle) {
    const { level, shuttle } = this.getLevelShuttle(rawShuttle);
    if (!level) return null;
    return (
      <TouchableOpacity
        style={ sty.button }
        onPress={ () => this.props.submitResults(level, shuttle) }
      >
        <Text h1 style={ sty.buttonText }>
          {`Level ${level} shuttle ${shuttle}`}
        </Text>
      </TouchableOpacity>
    );
  }

  buttons() {
    const { shuttle } = this.props.results;
    if (!shuttle) return null;
    return (
      <View style={ sty.buttons }>
        {this.renderButton(shuttle)}
        {this.renderButton(shuttle - 1)}
        {this.renderButton(shuttle - 2)}
      </View>
    );
  }

  render() {
    const { shuttle } = this.props.results;
    return (
      <View style={ sty.container }>
        <View style={ sty.headingContainer }>
          <Text h1 style={ sty.heading }>
            RESULTS
          </Text>
          <Text style={ sty.text }>
            What was the last shuttle you reached in time?
          </Text>
        </View>
        {this.buttons()}
      </View>
    );
  }
}

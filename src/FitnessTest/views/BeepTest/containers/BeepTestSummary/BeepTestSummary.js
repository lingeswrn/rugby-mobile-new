import * as sty from './BeepTestSummary.style';
import React, { Component } from 'react';
import { SceneContainer, Text } from 'src/lib/components';
import { View } from 'native-base';
import { BeepTestCard } from 'src/FitnessTest/views/sharedComponents';
import { PreviousTestResults } from './PreviousTestResults';

export class BeepTestSummary extends Component {
  render() {
    const { beepTests } = this.props;
    const resultsIndex = beepTests.length - 1;
    const results = beepTests[resultsIndex];
    const prevResults = resultsIndex ? beepTests[resultsIndex - 1] : null;
    return (
      <SceneContainer
        scrollEnabled={ false }
        title='Beep Test'
        headerButtons={{
          left: {
            icon: 'angle-left',
            onPress: () => this.props.history.push('/fitness-tests')
          },
          right: 'empty'
        }}
      >
        <View style={ sty.container }>
          <View style={ sty.titleWrapper }>
            <Text h1 inverse>
              Results
            </Text>
          </View>
          <View style={ sty.container }>
            <BeepTestCard superSize beepTest={ results } />
          </View>
          <PreviousTestResults
            results={ results }
            prevResults={ prevResults }
          />
        </View>
      </SceneContainer>
    );
  }
}

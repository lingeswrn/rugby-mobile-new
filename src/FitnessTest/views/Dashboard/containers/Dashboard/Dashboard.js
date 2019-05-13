import * as sty from './Dashboard.style';
import React, { Component } from 'react';
import { SceneContainer, Button } from 'src/lib/components';
import { View } from 'native-base';
import { StrengthTestCard, PrevBeepTest } from '../../components';

export class Dashboard extends Component {
  render() {
    const previousStrengthTest = this.props.strengthTest.previous;
    const previousBeepTest = this.props.fitnessTest.previous;
    return (
      <View>
        <SceneContainer
          title={ 'Recent Fitness Tests' }
          hideSceneFooter
          containerStyle={ sty.containerStyle }
          headerButtons={{
            left: {
              icon: 'angle-left',
              onPress: () => this.props.history.push('/')
            }
          }}
        >
          {/* ACTIVITY SUMMARIES */}
          <StrengthTestCard
            units={ this.props.units }
            completedAt={ previousStrengthTest.completedAt }
            activities={ previousStrengthTest.activities }
            viewHistory={ () => this.props.history.push('/strength-test/completed') }
          />
          <PrevBeepTest
            beepTest={ previousBeepTest }
            viewHistory={ () => this.props.history.push('/beep-test/completed') }
          />
        </SceneContainer>
        <View style={ sty.buttonWrapper }>
          <Button
            onPress={ () => this.props.history.push('/fitness-tests/select') }
            style={ sty.button }
            bordered
            light
            label='start a fitness test'
          />
        </View>
      </View>
    );
  }
}

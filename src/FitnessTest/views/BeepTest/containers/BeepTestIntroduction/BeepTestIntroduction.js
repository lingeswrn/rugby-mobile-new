import * as sty from './BeepTestIntroduction.style';
import React, { Component } from 'react';
import { compose } from 'redux';
import { injectBeepTestSounds } from 'src/FitnessTest/hoc';
import { withRouter } from 'react-router';
import { SceneContainer, Text, Button } from 'src/lib/components';
import { View, Button as NBButton, Icon } from 'native-base';

class _BeepTestIntroduction extends Component {
  render() {
    return (
      <SceneContainer title={ 'Beep Test' } hideSceneFooter>
        <View style={ sty.titleWrapper }>
          <Text h1 inverse>
            {'introduction'}
          </Text>
        </View>
        <View style={ sty.body }>
          <Text style={ sty.bodyText }>
            {
              'The beep test is a multistage running test designed to approximate your maximal aerobic power.'
            }
          </Text>
          <Text style={ sty.bodyText }>
            <Text>{
              'The test involves running 20 meter '
            }</Text>
            <Text h6 style={ sty.strong }>{ 'shuttles.' }</Text>
            <Text>{
              '  You must complete each shuttle at or before the sound of the beep.'
            }</Text>
          </Text>
          <View style={ sty.soundButtonWrapper }>
            <NBButton
              transparent
              style={ sty.soundButton }
              onPress={ () => this.props.ShuttleBeep.play() }
            >
              <Text h6>preview shuttle sound</Text>
              <Icon name='play' style={ sty.icon }/>
            </NBButton>
          </View>
          <Text style={ sty.bodyText }>
            <Text>{
              'At approximately each minute, you will hear an alert tone, indicating you\'ve reached a new '
            }</Text>
            <Text h6 style={ sty.strong }>{'level.'}</Text>
            <Text>
              {
                '  At each level, the time between beeps shortens, thus you must increase your pace.'
              }
            </Text>
          </Text>
          <View style={ sty.soundButtonWrapper }>
            <NBButton
              transparent
              style={ sty.soundButton }
              onPress={ () => this.props.LevelBeep.play() }
            >
              <Text h6>preview level sound</Text>
              <Icon name='play' style={ sty.icon }/>
            </NBButton>
          </View>
          <Text style={ sty.bodyText }>
            {
              'Once you fail to reach a cone at or before the beep, you have one shuttle to catch up to the beep, otherwise the test is over.  Your score will be determined from the last shuttle completed in time.'
            }
          </Text>
        </View>
        <View style={ sty.buttonWrapper }>
          <Button
            onPress={ () => this.props.history.push('/beep-test/instructions') }
            label='next'
            iconRight
            icon='angle-right'
          />
        </View>
      </SceneContainer>
    );
  }
}

export const BeepTestIntroduction = compose(
  withRouter,
  injectBeepTestSounds
)(_BeepTestIntroduction);

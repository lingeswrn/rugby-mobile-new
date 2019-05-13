import * as sty from './BeepTestInstructions.style';
import _ from 'lodash';
import React, { Component } from 'react';
import { SceneContainer } from 'src/lib/components';
import { withRouter } from 'react-router';
import { List, ListItem, View } from 'native-base';
import { Button, Text } from 'src/lib/components';

class _BeepTestInstructions extends Component {
  renderListItems(items) {
    return _.map(items, ({ text }, index) => (
      <ListItem style={ sty.itemWrapper } key={ index }>
        <Text h3 style={ sty.number }>{ `${(index + 1).toString()}. ` }</Text>
        <Text h5 style={ sty.bodyText }>{ text }</Text>
      </ListItem>
    ));
  }

  render() {
    const items = [
      { text: 'Mark a 20 meter stretch on a flat surface or track.' },
      { text: 'Start the test and run each shuttle to the tone of the beep. At the beginning of the test, you have 9 seconds to run each shuttle.' },
      { text: 'When you hear an alert tone, you have reached the next level and your running pace should increase by 0.5 km/hr.' },
      { text: 'If you fail to reach a cone by the sound of the beep, you have one chance to catch up, otherwise you must stop the test.' }
    ];

    return (
      <SceneContainer title={ 'Beep Test' } hideSceneFooter>
        <View style={ sty.titleWrapper }>
          <Text h1 inverse>{ 'INSTRUCTIONS' }</Text>
        </View>
        <List style={ sty.body }>
          { this.renderListItems(items) }
        </List>
        <View style={ sty.buttonWrapper }>
          <Button onPress={ () => this.props.history.push('/beep-test/start') }
            label='next'
            iconRight
            icon='angle-right'
          />
        </View>
      </SceneContainer>
    );
  }
}

export const BeepTestInstructions = withRouter(_BeepTestInstructions);

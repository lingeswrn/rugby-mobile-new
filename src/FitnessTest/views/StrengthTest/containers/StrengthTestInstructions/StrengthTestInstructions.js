import * as sty from './StrengthTestInstructions.style';
import _ from 'lodash';
import React, { Component } from 'react';
import { SceneContainer } from 'src/lib/components';
import { withRouter } from 'react-router';
import { List, ListItem, View } from 'native-base';
import { Button, Text } from 'src/lib/components';

class _StrengthTestInstructions extends Component {
  constructor(props) { super(props); }
  onPressStart = () => this.props.history.push('/strength-test/show')
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
      { text: 'Use a spotter at all times' },
      { text: 'Make sure all muscle groups are warmed up' },
      { text: 'Prior to each activity, practice the motion with no weight load' },
      { text: 'Use enough weight to perform a set to failure in 10 reps or fewer' },
      { text: 'If 10 reps are exceeded, wait 10 minutes and perform the \
exercise again with more weight' }

    ];
    return (
      <SceneContainer title={ 'Strength Test' } hideSceneFooter>
        <View style={ sty.titleWrapper }>
          <Text h1 inverse>{ 'INSTRUCTIONS' }</Text>
        </View>
        <List style={ sty.body }>
          { this.renderListItems(items) }
        </List>
        <View style={ sty.buttonWrapper }>
          <Button
            onPress={ this.onPressStart }
            style={ sty.button }
            label='begin test'
            iconRight
            icon='play'
          />
        </View>
      </SceneContainer>
    );
  }
}

export const StrengthTestInstructions = withRouter(_StrengthTestInstructions);

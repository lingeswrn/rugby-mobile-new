import * as sty from './WorkoutShow.style.js';
import * as actions from '../../../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SceneContainer } from 'src/lib/components';

import {
  ActivityList,
  StartBar
} from '../components';
import { View } from 'native-base';
class _WorkoutShow extends Component {
  constructor(props) {
    super(props);
  }

  onPressStart() {}

  render() {
    return (
      <View>
        <SceneContainer
          title={ 'Workout' }
          hideSceneFooter
          containerStyle={ sty.containerStyle }
        >
          <ActivityList { ...this.props }/>
        </SceneContainer>
        <View style={ sty.startBarWrapper }>
          <StartBar
            _onPress={ () => this.onPressStart() }/>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { training } = state;
  return { ...training };
}

export const WorkoutShow = connect(mapStateToProps, actions)(_WorkoutShow);

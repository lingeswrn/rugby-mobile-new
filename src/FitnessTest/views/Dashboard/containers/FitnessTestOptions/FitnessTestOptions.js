import * as sty from './FitnessTestOptions.style';

import React, { Component } from 'react';
import { Button, SceneContainer } from 'src/lib/components';
import { withRouter } from 'react-router';
import { View } from 'native-base';

class _FitnessTestOptions extends Component {
  render() {
    return (
      <View>
        <SceneContainer title={ 'Select Fitness Test' } hideSceneFooter>
          <Button
            style={ sty.buttonStyle }
            label='Strength Test'
            onPress={ () =>
              this.props.history.push('/strength-test/instructions')
            }
          />
          <Button
            style={ sty.buttonStyle }
            label='Beep Test'
            onPress={ () => this.props.history.push('/beep-test/introduction')
            }
          />
        </SceneContainer>
      </View>
    );
  }
}

export const FitnessTestOptions = withRouter(_FitnessTestOptions);

import * as sty from './Login.style';
import * as accountActions from '../actions';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Image, ImageBackground } from 'react-native';
import { Toast, View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import { CreateAccount, ResetPassword, Signin, Toggle } from '../components';
import { SceneContainer } from 'src/lib/components';

const loadingImage = require('../../images/rbv_logo_white_text.png');
const bgImage = require('../../images/login-screen-background.png');

class _LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }
  renderForm() {
    switch (this.state.selectedIndex) {
      case 1: return <CreateAccount />;
      case 2: return <ResetPassword />;
      default: return <Signin />;
    }
  }

  updateForm(index) {
    this.setState({
      selectedIndex: index
    });
  }
  componentDidMount() {
    const { location } = this.props.router;
    if (_.has(location, ['state', 'message'])) {
      Toast.show({
        text: location.state.message,
        position: 'bottom',
        type: 'danger',
        duration: 7500
      });
    }
  }

  render() {
    const { selectedIndex } = this.state;
    return (
      <SceneContainer hideSceneFooter hideSceneHeader scrollEnabled={ false }>
        <ImageBackground
          source={ bgImage }
          style={ sty.bgImageContainer }
          imageStyle={ sty.bgImg }
          resizeMethod='scale'
        >
          <LinearGradient colors={ sty.gradient } style={ sty.wrapper }>
            <Image
              source={ loadingImage }
              style={ sty.logoImage }
              resizeMethod='scale'
            />
            <View style={ sty.form }>
              { this.renderForm(selectedIndex) }
            </View>
            <View style={ sty.segmentWrapper }>
              <Toggle
                selectedIndex={ selectedIndex }
                updateForm={ (value) => this.updateForm(value) }
              />
            </View>
          </LinearGradient>
        </ImageBackground>
      </SceneContainer>
    );
  }
}

const mapStateToProps = ({ user, router }) => ({ user, router });

export const LoginScreen = connect(
  mapStateToProps, accountActions
)(_LoginScreen);

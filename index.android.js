import React, { Component } from 'react';
import { AppRegistry, BackHandler } from 'react-native';
import { App } from 'src/app/containers';
import { configureStore } from 'src/_store/configureStore';
import codePush from 'react-native-code-push';
const store = configureStore();

class AndroidWrapper extends Component {
  handleBackButton() {
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    console.disableYellowBox = true;
    return (
      <App store={ store } />
    );
  }
}

AppRegistry.registerComponent('Rugbyvault', () => codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.IMMEDIATE
})(AndroidWrapper));

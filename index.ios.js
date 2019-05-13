
import React from 'react';
import { AppRegistry } from 'react-native';
import { App } from 'src/app/containers';
import codePush from 'react-native-code-push';

const Rugbyvault = () => <App />;
AppRegistry.registerComponent('Rugbyvault', () => codePush({
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  checkFrequency: codePush.CheckFrequency[__DEV__ ? 'MANUAL' : 'ON_APP_RESUME']
})(Rugbyvault));

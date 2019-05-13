import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root, StyleProvider } from 'native-base';
import { getTheme, material } from 'src/lib/theme';
import { NativeRouter } from './NativeRouter';
import { withNetworkConnectivity } from 'react-native-offline';
import { configureStore } from 'src/_store/configureStore';
import SplashScreen from 'react-native-splash-screen';
import { withSocket } from '../hoc';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      store: configureStore(() => {
        this.setState({ loading: false });
        SplashScreen.hide();
      })
    };
  }

  Router = withNetworkConnectivity({
    withRedux: true
  })(withSocket(NativeRouter));

  render() {
    const { loading, store } = this.state;
    if (loading) return null;
    return (
      <StyleProvider style={ getTheme(material) }>
        <Root>
          <Provider store={ store }>
            <this.Router />
          </Provider>
        </Root>
      </StyleProvider>
    );
  }
}

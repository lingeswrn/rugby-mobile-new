/* functionality moved to App.js due to change in store constuction process */
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';
//
// export function requireStorage(ComposedComponent) {
//   class _StorageProvider extends Component {
//     constructor(props) { super(props); }
//     // componentDidMount() {}
//     componentWillReceiveProps(nextProps) {
//       const isLoaded = nextProps.storage.loaded;
//       const wasLoaded = this.props.storage.loaded;
//
//       if (!wasLoaded && isLoaded) {
//         SplashScreen.hide();
//       }
//     }
//
//     render() {
//       const { loaded } = this.props.storage;
//       // console.log({ loaded, complete, state });
//       if (loaded) {
//         return <ComposedComponent { ...this.props } />;
//       }
//       return null;
//     }
//   }
//
//   function mapStateToProps(state) {
//     return {
//       storage: state.storage
//     };
//   }
//   return connect(mapStateToProps, {})(_StorageProvider);
// }

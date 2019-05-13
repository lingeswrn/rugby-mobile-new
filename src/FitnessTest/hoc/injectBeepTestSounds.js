import Sound from 'react-native-sound';

import React, { Component } from 'react';
import { Platform } from 'react-native';
// import { Loader } from 'src/lib/components';

const basePaths = {
  level: {
    android: 'level_sound.mp3',
    ios: 'level_sound.mp3'
  },
  shuttle: {
    android: 'shuttle_sound.mp3',
    ios: 'shuttle_sound.mp3'
  }
};

class BeepHOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LevelBeep: new Sound(basePaths.level[Platform.OS], Sound.MAIN_BUNDLE,
        (err) => { if (err) console.error(err); }),
      ShuttleBeep: new Sound(basePaths.shuttle[Platform.OS], Sound.MAIN_BUNDLE,
        (err) => { if (err) console.error(err);})
    };
  }



  render() {
    const { Composed, ...rest } = this.props;
    return <Composed { ...{ ...rest, ...this.state } } />;
  }
}

/* eslint-disable react/no-multi-comp */
export const injectBeepTestSounds = (Composed) => (props) =>
  <BeepHOC Composed={ Composed } { ...props } />;

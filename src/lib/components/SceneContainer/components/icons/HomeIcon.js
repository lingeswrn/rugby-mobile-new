// import { colors } from 'rbv-core/colors';

import React, { Component } from 'react';
import { Image } from 'react-native';

export class HomeIcon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Image
        source={ require('../../../../../images/rbv_logo_white.png') }
        style={{ height: 28, resizeMode: 'contain', width: 56 }}
        resizeMethod={ 'auto' }
      />
    );
  }
}

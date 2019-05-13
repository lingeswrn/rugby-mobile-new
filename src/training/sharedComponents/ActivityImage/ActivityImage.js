import * as sty from './ActivityImage.style';
import React, { Component } from 'react';
import { View } from 'react-native';

import ResponsiveImage from 'react-native-responsive-image';
const fallbackImage = require('../../../images/rbv_logo_black_text.png');
export class ActivityImage extends Component {
  constructor(props) { super(props); }

  render() {
    const {
      template: { activity = {}},
      gender = 'male'
    } = this.props;
    const image = activity[`${gender}Image`];
    return (
      <View style={ sty.headerImageWrapper }>
        <View>
          <ResponsiveImage
            resizeMode='contain'
            resizeMethod='auto'
            source={ image ?
              { uri: image.url }
              : undefined
            }
            defaultSource={ fallbackImage }
            { ...sty.headerImage }
          />
        </View>
      </View>
    );
  }
}

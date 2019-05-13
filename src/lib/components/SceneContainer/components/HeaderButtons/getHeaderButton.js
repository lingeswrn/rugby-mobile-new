import React from 'react';
import { View } from 'native-base';

import { Back } from './Back';
import { CustomButton } from './CustomButton';
import { DrawerButton } from './DrawerButton';
import { Home } from './Home';

export function getHeaderButton(button, props) {
  const Button = button;
  switch (typeof button) {
    case 'string':
      switch (button) {
        case 'home':
          return <Home />;
        case 'back':
          return <Back />;
        case 'drawer':
          return <DrawerButton { ...props } />;
        case 'none':
        default:
          return <View />;
      }
    case 'function':
      return <Button />;
    case 'object':
      return <CustomButton { ...button } />;
    default:
      return <View />;
  }
}

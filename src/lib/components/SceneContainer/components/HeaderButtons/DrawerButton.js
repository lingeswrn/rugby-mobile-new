import * as sty from './HeaderButtons.style';
import React from 'react';
import { Icon } from 'native-base';

export const DrawerButton = ({ toggleDrawer }) =>
  <Icon name='bars' style={ sty.icon } onPress={ toggleDrawer } />;

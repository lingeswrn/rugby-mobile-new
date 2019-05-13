import * as sty from './Text.style';
import React from 'react';
import { Text as TextBase } from 'native-base';
export const Text = ({ children, style, ...rest }) =>
  <TextBase style={ [sty.text(rest), style] }>{ children }</TextBase>;

import * as matColors from './materialColorWheel';
import * as modifiers from './colorModifiers';
import _ from 'lodash';

const mods = {
  // shades
  darkest: (color) => modifiers.darken(color, 0.8),
  darker: (color) => modifiers.darken(color, 0.55),
  dark: (color) => modifiers.darken(color, 0.15),
  primary: (color) => color,
  light: (color) => modifiers.lighten(color, 0.2),
  lighter: (color) => modifiers.lighten(color, 0.55),
  lightest: (color) => modifiers.lighten(color, 0.85),

  // modifications
  desaturated: (color) => modifiers.desaturate(color, 0.5),
  faded: (color) => modifiers.fade(color, 0.4),
  inverse: (color) => modifiers.invert(color), // USE WITH CAUTION
  saturated: (color) => modifiers.saturate(color, 0.33),
};

const buildColor = (color) => _.mapValues(mods, (mod) => mod(color));
const buildPalette = (colors) => _.mapValues(colors, buildColor);

/* GRAYSCALE */
const gray = {
  lightest: modifiers.lighten(matColors.grey50, 0.25),
  lighter: matColors.grey100,
  light: matColors.grey300,
  primary: matColors.grey500,
  dark: modifiers.darken(matColors.grey700, 0.2),
  darker: modifiers.darken(matColors.grey800, 0.25),
  darkest: modifiers.darken(matColors.grey900, 0.75)
};

/* MAIN COLOR PALETTE */
const brand = {
  primary: matColors.red800, /* '#DE2629' */
  secondary: gray.darker,
  tertiary: gray.primary,
  success: matColors.green600,
  info: matColors.lightBlue400,
  warning: matColors.orange400,
  danger: matColors.deepOrange700
};

/* CANVAS */
const canvasColor = gray.lightest;
const canvas = _.assign({}, buildColor(matColors.grey200), {
  accent: brand.primary,
  disabled: gray.primary,
  inverse: modifiers.invert(canvasColor),
  primary: canvasColor,
});

const textColor = gray.darker;
const text = _.assign({}, brand, {
  accent: brand.primary,
  disabled: modifiers.darken(gray.light, 0.25),
  inverse: modifiers.invert(gray.darkest),
  primary: textColor
});

export const colors = _.assign({},
  { brand, canvas, clear: 'rgba(0,0,0,0)', gray, text, white: gray.lightest }, buildPalette(brand)
);

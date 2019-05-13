import Color from 'color';

export const darken = (color, amount = 0.5) =>
  Color(color).darken(amount).rgb().string();

export const desaturate = (color, amount = 0.5) =>
  Color(color).desaturate(amount).rgb().string();

export const fade = (color, amount = 0.5) =>
  Color(color).fade(amount).string();

export const lighten = (color, amount = 0.5) =>
  Color(color).lighten(amount).rgb().string();

export const saturate = (color, amount = 0.5) =>
  Color(color).saturate(amount).rgb().string();

export const invert = (color) =>
  Color(color).negate().rgb().string();

export const toHex = (color) => Color(color).hex();

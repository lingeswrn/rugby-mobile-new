import Color from 'color';
import { colors } from '../colorPalette';

export function getTextColor(bgColor) {
  return Color(bgColor).light() ?
    colors.text.primary : colors.text.inverse;
}

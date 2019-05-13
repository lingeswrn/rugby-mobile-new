import {
  fullBlack,
  darkBlack,
  lightBlack,
  minBlack,
  fullWhite,
  darkWhite,
  lightWhite,
} from './materialColorWheel';

class Typography {
  constructor() {
    // text colors
    this.textFullBlack = fullBlack;
    this.textDarkBlack = darkBlack;
    this.textLightBlack = lightBlack;
    this.textMinBlack = minBlack;
    this.textFullWhite = fullWhite;
    this.textDarkWhite = darkWhite;
    this.textLightWhite = lightWhite;

    // font weight
    this.fontWeightExtraLight = 100;
    this.fontWeightLight = 300;
    this.fontWeightNormal = 400;
    this.fontWeightMedium = 500;
    this.fontWeightBold = 700;
    this.fontWeightExtraBold = 900;

    // font size
    this.fontSize = 14;
    this.fontStyleButtonFontSize = 14;
    this.buttonFontSize = 14;
    this.h1FontSize = 36;
    this.h2FontSize = 32;
    this.h3FontSize = 26;
    this.h4FontSize = 24;
    this.h5FontSize = 20;
    this.h6FontSize = 16;
    this.display1FontSize = 32;
    this.display2FontSize = 28;
    this.display3FontSize = 24;
    this.display4FontSize = 20;
    this.display5FontSize = 16;
    this.display6FontSize = 12;
  }
}

export const typography = new Typography();

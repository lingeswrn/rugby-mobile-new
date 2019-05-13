import color from 'color';
import { colors } from 'rbv-core/colors';

import { Platform, Dimensions, PixelRatio } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = 'material';
const { gray, brand, text, canvas } = colors;

export const material =  {
  platformStyle,
  platform,
  // AndroidRipple
  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',

  // Badge
  badgeBg: brand.danger,
  badgeColor: text.inverse,
  // New Variable
  badgePadding: (platform === 'ios') ? 3 : 0,

  // Button
  btnFontFamily: (platform === 'ios') ? 'System' : 'Roboto_medium',
  btnDisabledBg: gray.primary,
  btnDisabledClr: gray.dark,

  // CheckBox
  CheckboxRadius: 0,
  CheckboxBorderWidth: 2,
  CheckboxPaddingLeft: 2,
  CheckboxPaddingBottom: (platform === 'ios') ? 0 : 5,
  CheckboxIconSize: (platform === 'ios') ? 18 : 14,
  CheckboxIconMarginTop: (platform === 'ios') ? undefined : 1,
  CheckboxFontSize: (platform === 'ios') ? 21 : 18,
  DefaultFontSize: 17,
  checkboxBgColor: brand.info,
  checkboxSize: 20,
  checkboxTickColor: colors.white,

  // Segment
  segmentBackgroundColor: brand.primary,
  segmentActiveBackgroundColor: colors.white,
  segmentTextColor: colors.white,
  segmentActiveTextColor: brand.primary,
  segmentBorderColor: colors.white,
  segmentBorderColorMain: brand.primary,

  // New Variable
  get defaultTextColor() {
    return this.textColor;
  },


  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  get btnTextSize() {
    return platform === 'ios' ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },

  buttonPadding: 6,

  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },


  // Card
  cardDefaultBg: colors.white,


  // Color
  brandPrimary: brand.primary,
  brandInfo: brand.info,
  brandSuccess: brand.success,
  brandDanger: brand.danger,
  brandWarning: brand.warning,
  brandSidebar: gray.darkest,


  // Font
  fontFamily: 'System',
  fontSizeBase: 14,

  get fontSizeH1() {
    return this.fontSizeBase * 1.75;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.5;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.25;
  },


  // Footer
  footerHeight: 55,
  footerDefaultBg: gray.darkest,


  // FooterTab
  tabBarTextColor: gray.lightest,
  tabBarTextSize: (platform === 'ios') ? 12 : 11,
  activeTab: colors.white,
  sTabBarActiveTextColor: '#007aff',
  tabBarActiveTextColor: colors.white,
  tabActiveBgColor: brand.primary,

  // Tab
  tabDefaultBg: gray.darkest,
  topTabBarTextColor: gray.lightest,
  topTabBarActiveTextColor: colors.white,
  topTabActiveBgColor: brand.primary,
  topTabBarBorderColor: colors.white,
  topTabBarActiveBorderColor: colors.white,


  // Header
  toolbarBtnColor: gray.lightest,
  toolbarDefaultBg: gray.darkest,
  toolbarHeight: (platform === 'ios') ? 76 : 56,
  toolbarIconSize: (platform === 'ios') ? 20 : 22,
  toolbarSearchIconSize: (platform === 'ios') ? 20 : 23,
  toolbarInputColor: colors.white,
  searchBarHeight: (platform === 'ios') ? 30 : 40,
  toolbarInverseBg: gray.darkest,
  toolbarTextColor: gray.lightest,
  toolbarDefaultBorder: gray.lightest,
  iosStatusbar: 'light-content',
  get statusBarColor() {
    return color(this.toolbarDefaultBg).darken(0.2).hex();
  },


  // Icon
  iconFamily: 'FontAwesome',
  iconFontSize: (platform === 'ios') ? 30 : 28,
  iconMargin: 7,
  iconHeaderSize: (platform === 'ios') ? 29 : 24,

  // InputGroup
  inputFontSize: 17,
  inputBorderColor: canvas.lighter,
  inputSuccessBorderColor: brand.success,
  inputErrorBorderColor: brand.danger,

  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return '#575757';
  },

  inputGroupMarginBottom: 10,
  inputHeightBase: 50,
  inputPaddingLeft: 5,

  get inputPaddingLeftIcon() {
    return this.inputPaddingLeft * 8;
  },

  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: (platform === 'ios') ? 37 : 30,
  lineHeight: (platform === 'ios') ? 20 : 24,


  // List
  listBorderColor: gray.primary,
  listDividerBg: canvas.lighter,
  listItemHeight: 45,
  listBtnUnderlayColor: canvas.primary,

  // Card
  cardBorderColor: canvas.lighter,

  // Changed Variable
  listItemPadding: (platform === 'ios') ? 10 : 12,

  listNoteColor: gray.primary,
  listNoteSize: 13,

  // Progress Bar
  defaultProgressColor: brand.primary,
  inverseProgressColor: gray.darkest,

  // Radio Button
  radioBtnSize: (platform === 'ios') ? 25 : 23,
  radioSelectedColorAndroid: brand.primary,

  // New Variable
  radioBtnLineHeight: (platform === 'ios') ? 29 : 24,

  radioColor: gray.light,

  get radioSelectedColor() {
    return color(this.radioColor).darken(0.2).hex();
  },


  // Spinner
  defaultSpinnerColor: brand.primary,
  inverseSpinnerColor: brand.secondary,


  // Tabs
  tabBgColor: canvas.primary,
  tabFontSize: 15,
  tabTextColor: text.primary,


  // Text
  textColor: text.primary,
  inverseTextColor: text.inverse,
  noteFontSize: 14,


  // Title
  titleFontfamily: (platform === 'ios') ? 'System' : 'Roboto_medium',
  get titleFontSize() {
    return this.fontSizeH1 - 4;
  },
  subTitleFontSize: 14,
  subtitleColor: text.primary,

  // New Variable
  titleFontColor: text.primary,


  // Other
  borderRadiusBase: 0,
  borderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)),
  contentPadding: 10,

  get darkenHeader() {
    return color(this.tabBgColor).darken(0.03).hex();
  },

  dropdownBg: canvas.inverse,
  dropdownLinkColor: brand.primary,
  inputLineHeight: 24,
  jumbotronBg: canvas.primary,
  jumbotronPadding: 30,
  deviceWidth,
  deviceHeight,

  // New Variable
  inputGroupRoundedBorderRadius: 30
};

export default material;

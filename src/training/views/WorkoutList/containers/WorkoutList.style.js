import { colors, fade } from 'rbv-core/colors';

export const upcomingTitleWrapper = {
  backgroundColor: 'transparent',
  alignItems: 'center',
  borderBottomColor: colors.primary.primary,
  borderBottomWidth: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  paddingBottom: 15,
  paddingTop: 20
};

export const upcomingTitle = {
  backgroundColor: 'transparent',
  color: colors.text.accent,
  fontWeight: '200',
  letterSpacing: 2,
  fontSize: 24
};

export const summaryPlaceholderWrapper = {
  height: 125,
  marginVertical: 2,
  marginHorizontal: 6,
  borderColor: fade(colors.info.light),
  borderWidth: 1,
  borderStyle: 'dashed',
  backgroundColor: colors.info.lightest,
  justifyContent: 'center',
  alignItems: 'stretch'
};

export const summaryPlaceholder = {
  lineHeight: 30,
  alignSelf: 'center',
  textAlign: 'center',
  color: colors.info.primary,
  fontSize: 20,
  fontWeight: '400'
};

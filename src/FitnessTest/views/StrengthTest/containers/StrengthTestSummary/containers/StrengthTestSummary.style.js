import { colors } from 'rbv-core/colors';

export const bodyText = {
  lineHeight: 24,
  letterSpacing: 1.25,
  fontWeight: '300',
  fontSize: 18,
  marginBottom: 10,
  textAlign: 'center'
};
export const bodyWrapper = {
  paddingHorizontal: 10,
  paddingVertical: 16,
  alignItems: 'center',
};

export const button = {
  borderWidth: 2,
  alignSelf: 'center',
  width: 125
};

export const buttonText = {
  fontWeight: '700'
};

export const buttonWrapper = {
  backgroundColor: 'transparent',
  alignSelf: 'stretch',
  alignItems: 'center',
  paddingVertical: 12,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0
};

export const containerStyle = {
  paddingBottom: 77,
};
export const listHeader = {
  alignSelf: 'stretch',
  alignItems: 'center',
  backgroundColor: colors.canvas.primary,
  paddingVertical: 12,
  borderColor: colors.gray.dark,
  borderBottomWidth: 2,
  shadowColor: colors.gray.dark,
  shadowOffset: {
    width: 0,
    height: -22
  },
  shadowOpacity: 0.5,
  shadowRadius: 10
};

export const listTitle = {
  color: colors.text.primary,
  fontSize: 30,
  fontWeight: '200'
};

export const listSubtitle = {
  color: colors.text.primary,
  fontSize: 12,
  fontWeight: '600',
  letterSpacing: 2,
  marginTop: 6
};

export const strong = {
  ...bodyText,
  fontWeight: '800'
};

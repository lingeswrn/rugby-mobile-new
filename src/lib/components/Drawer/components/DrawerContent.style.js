import { colors } from 'rbv-core/colors';

export const wrapper = {
  backgroundColor: colors.canvas.inverse,
  flex: 1,
  paddingTop: 25
};

export const listItemWrapper = {
  borderBottomColor: colors.primary.dark,
  marginLeft: 0,
  paddingLeft: 15
};

export const icon = {
  position: 'absolute',
  right: 15,
  color: colors.text.inverse,
  fontSize: 20
};

export const itemLabel = {
  paddingRight: 30,
  alignSelf: 'flex-end',
  fontWeight: '200',
  color: colors.text.inverse
};

export const buttonWrapper = {
  alignItems: 'stretch',
  flex: 0,
  justifyContent: 'flex-end',
  bottom: 0
};

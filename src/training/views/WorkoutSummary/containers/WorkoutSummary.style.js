import { colors } from 'rbv-core/colors';

export const title = {
  alignSelf: 'center',
  backgroundColor: 'transparent',
  color: colors.text.inverse,
  letterSpacing: 1.5
};

export const titleWrapper = {
  backgroundColor: colors.gray.dark,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 0,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 8,
  paddingTop: 8
};

export const notesText = {
  color: colors.text.primary,
  marginBottom: 200
};

export const doneButton = {
  flex: 1,
  alignSelf: 'center',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
};

export const contentWrapper = {
  flex: 1
};

export const viewWrapper = {
  flex: 1,
  backgroundColor: colors.canvas.primary
};

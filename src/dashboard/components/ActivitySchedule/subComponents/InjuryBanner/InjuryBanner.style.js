import { colors } from 'rbv-core/colors';

export const wrapper = {
  alignItems: 'center',
  flexDirection: 'row',
  padding: 6,
  backgroundColor: colors.warning.primary,
  borderColor: colors.warning.dark,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  justifyContent: 'space-between'
};
export const header = {
  color: colors.text.inverse,
  flex: 1,
  textAlign: 'left'
};
export const icon = {
  paddingTop: 4,
  color: colors.text.inverse,
  marginHorizontal: 16,
  fontSize: 24
};
export const iconClose = {
  ...icon,
  fontSize: 18,
  marginHorizontal: 8
};

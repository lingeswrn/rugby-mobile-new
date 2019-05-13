import { colors, fade } from 'rbv-core/colors';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';

export const wrapper = {
  marginTop: 12,
  alignSelf: 'stretch',
  alignItems: 'stretch',
  flex: 0
};

export const icon = {
  iconColor: colors.text.inverse,
  iconSize: 27,
  iconClass: FontAwesome
};

export const iconContainer = {
  backgroundColor: colors.brand.primary,
  width: 60,
};

export const container = {
  borderWidth: 2,
  borderColor: colors.brand.primary,
  backgroundColor: fade(colors.canvas.primary, 0.25),
  borderRadius: 2
};

export const input = {
  color: colors.text.primary,
  fontFamily: 'BebasNeue',
  fontSize: 24,
  lineHeight: 27,
};

export const label = {
  color: colors.gray.primary,
  fontFamily: 'BebasNeue',
  fontSize: 24,
  lineHeight: 27,
  paddingLeft: 4,
  fontWeight: undefined
};

export const errorWrapper = {
  flex: 0.25,
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: 7,
};

export const errorText = {
  color: colors.brand.danger
};

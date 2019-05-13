import { colors, fade } from 'rbv-core/colors';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';

export const icon = {
  iconColor: colors.canvas.primary,
  iconSize: 26,
  iconClass: FontAwesome
};
export const inputStyles = (inverse) => {
  const color = inverse ? colors.canvas.primary : colors.brand.primary;
  const container = {
    backgroundColor: fade(colors.canvas[inverse ? 'inverse' : 'primary'], 0.25),
    borderWidth: 2,
    borderColor: color,
    borderRadius: 2,
    height: 53,
    flex: 0
  };
  const input = {
    color: colors.text[inverse ? 'inverse' : 'primary'],
    fontFamily: 'BebasNeue',
    fontSize: 18,
    lineHeight: 24,
  };
  const label = {
    color: inverse ? colors.gray.light : colors.gray.primary,
    fontFamily: 'BebasNeue',
    fontSize: input.fontSize - 4,
    lineHeight: input.lineHieght,
    paddingLeft: 12,
    fontWeight: undefined
  };
  return {
    container,
    errorText: { color: color, flex: 0, marginVertical: 8 },
    errorWrapper: {
      alignItems: 'center',
      flex: 0,
      height: 16,
      justifyContent: 'flex-start'
    },
    icon: {
      ...icon,
      iconColor: inverse ? colors.brand.primary : colors.canvas.primary,
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor: color,
      justifyContent: 'center',
      padding: 0,
      paddingRight: 4,
      width: 60
    },
    input,
    label,
    units: {
      ...label,
      position: 'absolute',
      right: 25,
      top: (container.height / 2) - (input.fontSize / 2)
    },
    wrapper: {
      marginTop: 6,
      alignSelf: 'stretch',
      alignItems: 'stretch',
      height: 86,
      flex: 0
    }
  };
};

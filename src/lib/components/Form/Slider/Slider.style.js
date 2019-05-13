import { colors, fade } from 'rbv-core/colors';

export const track = {
  height: 2
};

export const maximumTrackTintColor = colors.canvas.darker;
export const iconStyle = {
  color: colors.text.primary,
  paddingLeft: 8,
  fontSize: 24
};

export const iconStyleError = {
  ...iconStyle,
  color: colors.brand.warning
};

export const errorWrapper = {
  alignItems: 'center',
  alignSelf: 'stretch',
  flex: 0,
  justifyContent: 'flex-start',
  backgroundColor: colors.brand.warning,
  borderWidth: 2,
  borderColor: colors.brand.warning,
  marginTop: -2,
  marginLeft: 0,
  marginRight: 0,
  padding: 0
};

export const inputWrapper = {
  flex: 0,
  marginTop: 8,
  height: 120
};

export const textInputContainer = {
  marginBottom: 8
};

export const errorText = {
  color: colors.gray.lightest
};

export const borderColorDynamic = {
  danger: colors.brand.danger,
  warning: colors.brand.warning,
  success: colors.brand.primary
};

export const labelWrapper = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  paddingHorizontal: 16
};

export const label = {
  backgroundColor: 'transparent',
  color: colors.text.primary
};
export const value = {
  ...label,
  fontWeight: '600'
};

export const getColor = (status) => status === 'warning' ?
  colors.brand.warning : colors.primary.dark;

export const getFadedColor = (status) =>
  fade(colors.brand[status], 0.5);
export const getThumbColor = (status) => status === 'warning' ?
  colors.brand.warning : colors.primary.saturated;

export const tickWrapper = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',

  position: 'absolute',
  left: 0,
  right: 0,
  // bottom: 0,
  height: 40

};

export const tick = (index, tickSize, tickVal, val) => {
  const isEven = (index % 2);
  const size = isEven ? tickSize / 1.5 : tickSize;
  return {
    backgroundColor: val > tickVal ?
      colors.primary.dark : colors.canvas.primary,
    borderRadius: size / 2,
    borderColor: maximumTrackTintColor,
    borderWidth: 1,
    flex: 0,
    height: size,
    width: size,
  };
};

export const tickLabelWrapper = {
  flexDirection: 'row',
  justifyContent: 'space-between'
};

export const tickLabelContainer = (index, last) => ({
  flex: 1,
  alignItems: index === 0 ? 'flex-start' : index === last ? 'flex-end' : 'center',
  flexBasis: `${(1 / (last + 1)) * 100}%`,
  flexShrink: 0
});

export const tickLabel = {
  color: colors.primary.dark
};

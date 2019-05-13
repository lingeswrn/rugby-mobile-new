import { colors, fade, lighten } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const wrapper = {
  backgroundColor: fade(colors.gray.light),
  flexDirection: 'row',
  paddingVertical: 8
};

export const gaugeWrapper = {
  alignItems: 'center'
};

export const progress = {
  alignSelf: 'center'
};

export const gaugeProps = (fill) => {
  return {
    backgroundColor: lighten(colors.primary.desaturated),
    cropDegree: 90,
    fill,
    rotation: 90,
    size: width * 0.35,
    tintColor: colors.brand.primary,
    width: 15
  };
};

export const gaugeTextWrapper = (fill) => {
  const props = gaugeProps(fill);
  return {
    position: 'absolute',
    top: props.width * 2,
    left: props.width,
    width: props.size - (props.width * 2),
    height: props.size *
      (1 - props.cropDegree / 360) - (props.width * 2),
    alignItems: 'center',
    justifyContent: 'center'
  };
};

export const gaugeText = { fontSize: width * 0.14  };
export const listWrapper = {
  paddingTop: 42,
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  paddingRight: 10
};

export const listItem = (status, disabled) => {
  let color = colors.text.primary;
  switch(true) {
    case disabled: color = colors.text.disabled; break;
    case status === 'complete': color = colors.gray.primary; break;
    case status === 'incomplete': color = colors.warning.dark; break;
    default: break;
  }

  return {
    color,
    textDecorationColor: colors.gray.primary,
    textDecorationLine: status === 'complete' ? 'line-through' : 'none'
  };
};

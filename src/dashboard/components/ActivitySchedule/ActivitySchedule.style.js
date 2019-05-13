import { colors, fade } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const wrapper = {
  paddingVertical: 0
};

export const titleWrapper = {
  flex: 0,
  height: 42,
  backgroundColor: colors.brand.primary,
  alignItems: 'center',
  justifyContent: 'center'
};

export const gaugeWrapper = {
  alignItems: 'center'
};

export const gaugeProps = (fill) => {
  return {
    backgroundColor: fade(colors.primary.desaturated),
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

export const gaugeText = { fontSize: width * 0.15  };
export const listWrapper = {
  paddingTop: 42,
  alignItems: 'flex-end',
  justifyContent: 'flex-start'
};

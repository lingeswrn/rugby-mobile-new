import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const animation = (anim, direction) => {
  const translate = direction === 'bottom' ? 'translateY' : 'translateX';
  const dimension = direction === 'bottom' ? height : width;

  const outputRange = direction === 'right' ?
    [ 0, (0 - dimension) ] : [ 0, dimension ];
  return {
    position: 'absolute',
    bottom: 0,
    top: 0,
    width,
    transform: [{
      [translate]: anim.interpolate({
        inputRange: [ 0, 1 ],
        outputRange
      })
    }],
  };
};

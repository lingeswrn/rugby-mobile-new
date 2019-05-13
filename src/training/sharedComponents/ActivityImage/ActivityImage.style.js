// import { colors, fade } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const headerImageWrapper = {
  flex: 0,
  alignItems: 'center',
  backgroundColor: 'transparent'
};

export const headerImage = {
  initWidth: width + 60,
  initHeight: height - 425
};

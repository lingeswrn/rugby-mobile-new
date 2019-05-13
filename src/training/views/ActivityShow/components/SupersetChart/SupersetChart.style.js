import { colors } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const wrapper = {
  alignItems: 'center',
  flex: 1,
  height: 120,
  justifyContent: 'center',
  marginTop: 24,
};

export const titleWrapper = {
  alignItems: 'center'
};

export const title = {
  backgroundColor: 'transparent',
  fontSize: 20,
  fontWeight: '300',
  letterSpacing: 1.2
};

export const description = {
  backgroundColor: 'transparent',
  textAlign: 'center',
  fontWeight: '200',
  fontSize: 12,
  marginTop: 6,
  fontStyle: 'italic'
};

export const setCount = {
  textAlign: 'center',
  fontWeight: '700',
  fontSize: 18,
  letterSpacing: 1.5
};

export const contentWrapper = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  position: 'absolute',
  marginHorizontal: 'auto',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

export const progressBar = (progress) => {
  let color = 'primary';
  if (progress && progress < 1) color = 'warning';
  else if (progress) color = 'success';

  return {
    width,
    height: 60,
    color: colors.brand[color],
    container: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderRightWidth: 0,
      borderColor: colors.brand.primary,
      shadowColor: colors.primary.dark
    }
  };
};

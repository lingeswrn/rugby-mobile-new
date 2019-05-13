import { Platform } from 'react-native';

import { colors, fade } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
export const wrapper = {
  justifyContent: 'space-between',
  flex: 1,
  height,
  paddingHorizontal: 40,
  marginTop: -20,
  paddingTop: 40,
  paddingBottom: 20,
  width: width + 5,
  backgroundColor: fade(colors.gray.darkest, 0.4)
};

export const segmentWrapper = {
  flex: 0,
  height: 40,
  justifyContent: 'center',
  marginBottom: 8,
  paddingVertical: 10
};

export const segmentTintColor = colors.gray.light;

export const logoImage = {
  flex: 0,
  justifyContent: 'flex-start',
  resizeMode: 'contain',
  width: width - (wrapper.paddingHorizontal * 2),
  height: 175
};

export const bgImageContainer = { paddingTop: 20, marginTop: -20 };
export const bgImg = { flex: 0, width: width + 5, height, resizeMode: 'cover' };

export const title = {
  fontSize: 20,
  textAlign: 'center',
  paddingTop: 30,
  fontWeight: '200'
};

export const gradient = [
  colors.gray.darkest,
  fade(colors.gray.darkest, 0.4),
  fade(colors.gray.darkest, 0.75),
  fade(colors.gray.darkest, 0.9),
  fade(colors.gray.darkest, 0.95)
];

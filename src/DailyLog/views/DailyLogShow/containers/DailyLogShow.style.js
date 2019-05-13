import { colors, fade } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

export const wrapper = {};
export const sectionWrapper = {
  borderColor: colors.brand.primary,
  borderBottomWidth: 1
};

export const section = (active) => ({
  subtitle: {
    color: active ? colors.text.inverse : colors.gray.dark
  },
  title: {
    color: active ? colors.text.inverse : colors.text.accent
  },
  titleWrapper: {
    alignItems: 'center',
    backgroundColor: active ? colors.brand.primary : 'transparent',
    borderColor: colors.primary.primary,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 75,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: colors.canvas.inverse,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: active ? 0.35 : 0,
    shadowRadius: 7
  }
});

export const sectionTitleWrapper = {
  alignItems: 'center',
  borderColor: colors.primary.primary,
  borderBottomWidth: 1,
  flexDirection: 'row',
  height: 70,
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingVertical: 32
};

export const sectionTitle = {
  color: colors.text.accent
};
export const subtitle = {
  color: colors.gray.dark
};
export const formSectionContainer = {
  justifyContent: 'center',
  backgroundColor: fade(colors.gray.light),
  paddingHorizontal: 16,
  paddingVertical: 32,
  height: height / 2
};

export const inputWrapper = {
  justifyContent: 'center'
};

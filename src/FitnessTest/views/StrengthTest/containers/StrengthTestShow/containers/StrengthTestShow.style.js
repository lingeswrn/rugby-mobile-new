import { colors } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const activityName = {
  color: colors.gray.lightest,
  // fontStyle: 'uppercase'
};

export const activityTitleWrapper = {
  justifyContent: 'center',
  alignItems: 'stretch',
  flex: 1,
  backgroundColor: 'transparent',
  marginBottom: 0
};

export const pickerStyle = {
  backgroundColor: colors.canvas.inverse,
  alignSelf: 'stretch',
  flex: 1
};

export const pickerTextStyle = {
  textAlign: 'center',
  color: colors.text.inverse,
  fontFamily: 'BebasNeue',
  fontSize: 36,
  lineHeight: 40,
  paddingVertical: 16
};

export const pickerItemStyle = {
  borderBottomWidth: 1,
  borderColor: colors.gray.light,
  marginLeft: 0,
  paddingLeft: 10
};

export const pickerItemTextStyle = {
  color: colors.gray.darkest
};

export const headerImageWrapper = {
  flex: 0,
  width,
  height: 200,
  padding: 8,
  backgroundColor: colors.gray.lightest
};

export const headerImage = {
  width: width - 20,
  height: (headerImageWrapper.height - 20),
  resizeMode: 'contain',
  opacity: 0.5
};

export const activityControlsWrapper = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0
};

export const sceneContainerStyle = {
  marginBottom: activityControlsWrapper.height
};

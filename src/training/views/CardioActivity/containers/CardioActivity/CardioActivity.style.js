import { colors } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const activityName = {
  color: colors.gray.lighter,
  fontSize: 20
};

export const activityTitleWrapper = {
  flex: 1,
  // flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'stretch',
  backgroundColor: 'transparent',
  marginVertical: 5
};

export const titleContainer = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  paddingHorizontal: 15
};
export const tempoContainer = {
  flex: 1,
  paddingHorizontal: 20,
  alignItems: 'center',
  borderTopWidth: 1,
  alignSelf: 'center',
  borderTopColor: colors.gray.light,
  paddingTop: 4
};
export const tempo = {
  flexDirection: 'row',
  // justifyContent: 'flex-start',
  fontStyle: 'italic',
  fontWeight: '200',
  letterSpacing: 1.25,
  fontSize: 12
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
  opacity: 0.75
};

export const activityControlsWrapper = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 110
};

export const containerStyle = {
  marginBottom: activityControlsWrapper.height,
  flex: 1,

};

export const repChartWrapper  = {
  borderColor: colors.brand.primary,
  borderBottomWidth: 2

};

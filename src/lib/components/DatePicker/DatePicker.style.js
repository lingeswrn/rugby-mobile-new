import { colors } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { width/* , height */ } = Dimensions.get('window');
import { Platform } from 'react-native';

export const wrapper = { marginTop: 10 };

export const container = {
  height: 60,
  alignSelf: 'stretch',
  alignItems: 'stretch',
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderTopWidth: 1,
  borderRadius: 2,
  borderColor: colors.gray.dark,
  width: (width - 40),
  paddingHorizontal: 20
};

export const customStyles = {
  dateIcon: { display: 'none' },
  dateInput: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 60,
    width: undefined,
    borderWidth: 0,
    // paddingRight: 5,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 0,
    borderColor: colors.brand.primary,
  },
  placeholderText: {
    fontFamily: 'System',
    paddingBottom: 4,
    fontSize: 20,
    fontWeight: '600',
    color: colors.gray.primary
  },
  dateText: {
    color: colors.text.primary,
    fontFamily: 'System',
    paddingBottom: 4,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: Platform.OS === 'ios' ? undefined : 20,
  }
};

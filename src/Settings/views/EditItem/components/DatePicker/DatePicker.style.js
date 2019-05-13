import { colors } from 'rbv-core/colors';
import { Dimensions } from 'react-native';
const { width/* , height */ } = Dimensions.get('window');
import { Platform } from 'react-native';

export const wrapper = {
  marginTop: 10,
  backgroundColor: colors.brand.primary
};

export const container = {
  height: 60,
  alignSelf: 'stretch',
  alignItems: 'stretch',
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderTopWidth: 1,
  borderRadius: 2,
  borderColor: colors.brand.primary,
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
    // justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 0,
    borderColor: colors.brand.primary,
  },
  placeholderText: {
    fontFamily: 'BebasNeue',
    paddingBottom: 4,
    fontSize: 20,
    fontWeight: undefined,
    color: colors.white,
    textAlign: 'center'
  },
  dateText: {
    color: colors.white,
    fontFamily: 'BebasNeue',
    // padding: 8,
    fontSize: 32,
    fontWeight: undefined,
    marginBottom: Platform.OS === 'ios' ? undefined : 4,
    marginLeft: 40,
    textAlign: 'center'
  }
};

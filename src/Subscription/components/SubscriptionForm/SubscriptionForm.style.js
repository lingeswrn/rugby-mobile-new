import { colors } from 'rbv-core/colors';
import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window') || {};

const { width = 50 } = dimensions;

export const wrapper = {
  backgroundColor: colors.canvas.primary
};

export const cancelButton = {
  backgroundColor: colors.gray.darker
};

// FORM ________________________________________________________________________
export const formWrapper = {
  borderTopWidth: 0.5,
  borderColor: colors.gray.darker
};

export const xButton = {
  padding: 16
};

export const formTitleWrapper = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 8,
  marginRight: 16
};

export const cardForm = {
  cursorColor: colors.brand.info,
  textErrorColor: colors.brand.danger,
  placeholderColor: colors.gray.dark,
};

export const cardTextField = {
  alignSelf: 'center',
  backgroundColor: colors.gray.lightest,
  borderColor: colors.gray.darker,
  borderWidth: 0.5,
  borderRadius: 2,
  color: colors.text.primary,
  width: width - 16
};

export const submitButton = {
  marginTop: 48
};

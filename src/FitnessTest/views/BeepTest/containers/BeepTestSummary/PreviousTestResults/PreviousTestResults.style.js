import { colors } from 'rbv-core/colors';

export const container = {
  flex: 1,
  alignItems: 'stretch',
};

export const innerContainer = {
  ...container,
  paddingHorizontal: 60,
  marginTop: 12
};

export const titleWrapper = {
  backgroundColor: colors.brand.primary,
  alignItems: 'center',
  flex: 1,
  paddingVertical: 12
};

export const row = {
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'space-between'
};

export const percentContainer = (didImprove) => ({
  alignItems: 'center',
  flex: 1,
  marginTop: 24,
  marginHorizontal: 60,
  paddingVertical: 18,
  paddingHorizontal: 6,
  borderWidth: 1,
  borderColor: didImprove ? colors.brand.success : colors.brand.danger
});

export const resultText = (didImprove) => ({
  color: didImprove ? colors.brand.success : colors.brand.danger,
  fontSize: 24,
  fontWeight: '300'
});


export const percentage = (didImprove) =>( {
  color: didImprove ? colors.brand.success : colors.brand.danger,
  fontSize: 82,
  marginBottom: -12
});

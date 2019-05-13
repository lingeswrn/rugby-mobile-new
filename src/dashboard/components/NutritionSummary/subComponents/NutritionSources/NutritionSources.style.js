import { colors } from 'rbv-core/colors';

export const container = {
  flex: 1,
  paddingBottom: 10,
  paddingTop: 10,
  paddingHorizontal: 14,
  borderBottomWidth: 1,
  borderColor: colors.gray.primary
};

export const titleContainer = {
  alignItems: 'center',
  paddingVertical: 3,
  marginBottom: 6
};

export const title = {
  fontSize: 16,
  letterSpacing: 1,
  fontWeight: '200'
};

export const buttons = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
};

export const button = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.gray.dark,
  borderRadius: 4,
  marginHorizontal: 4,
  paddingVertical: 6
};

export const buttonText = {
  color: colors.gray.lightest,
  fontSize: 22
};

export const icon = {
  marginRight: 12,
  fontSize: 20,
  color: colors.gray.lightest
};

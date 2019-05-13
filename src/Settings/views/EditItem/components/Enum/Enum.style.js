import { colors } from 'rbv-core/colors';

export const item = (active) => ({
  wrapper: {
    justifyContent: 'space-between',
    marginLeft: 0,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: active ? colors.brand.primary : colors.canvas.primary,
    borderBottomColor: colors.gray.darker,
    borderTopColor: colors.gray.darker,
    borderTopWidth: 1
  },
  value: {
    color: active ? colors.text.inverse : colors.text.primary
  },
  icon: {
    fontSize: 16,
    color: colors.text.inverse,
    marginLeft: 8,
    alignSelf: 'flex-end',
    lineHeight: 16
  }
});

export const itemWrapper = {
  justifyContent: 'space-between',
  marginLeft: 0,
  paddingHorizontal: 10,
  paddingVertical: 5,
  backgroundColor: colors.canvas.primary,
  borderBottomColor: colors.gray.primary,
  borderTopColor: colors.gray.primary
};

export const listSeparator = {
  backgroundColor: colors.gray.lighter
};

export const separatorLabel = {
  color: colors.gray.darker,
  fontSize: 12
};

export const itemLabel = {
  color: colors.gray.light,
  fontSize: 12
};

export const itemValue = {
  fontSize: 16
};

export const itemRightContainer = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'center'
};

export const itemIcon = {
};

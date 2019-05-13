import { colors } from 'rbv-core/colors';

export const setLabel = (index, setIndex) => {
  const style = { color: colors.text.primary, paddingHorizontal: 2 };
  switch(true) {
    case (index === setIndex):
      return { ...style, color: colors.text.inverse, fontSize: 24 };
    case (index > setIndex): return { ...style, color: colors.text.primary };
    default: return style;
  }
};

export const listItemWrapper = (index, setIndex) => {
  return {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: index === setIndex ?
      colors.brand.primary : 'transparent',
    paddingRight: 15,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    height: 42
  };
};

export const setWrapper = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'flex-start'
};

export const valueWrapper = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'flex-end'
};

export const liftingWrapper = {
  alignItems: 'center',
  flexDirection: 'row',
};

export const small = ({ fontSize, ...rest }) => {
  return {
    ...rest,
    fontSize: fontSize / 1.8,
    fontWeight: '100'
  };
};

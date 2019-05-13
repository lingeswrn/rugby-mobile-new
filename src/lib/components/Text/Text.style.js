import _ from 'lodash';
import { colors } from 'rbv-core/colors';

const fontSizes = { h1: 40, h2: 36, h3: 32, h4: 26, h5: 22, h6: 18 };

const getStyles = (memo, bool, key) => {
  switch (true) {
    case _.has(colors.brand, [key]):
      return { ...memo, color: colors.brand[key] };
    case _.has(colors.gray, [key]):
      return { ...memo, color: colors.gray[key] };
    case _.has(colors.text, [key]):
      return { ...memo, color: colors.text[key] };
    case _.has(fontSizes, [key]):
      return { ...memo, fontSize: fontSizes[key], fontFamily: 'BebasNeue' };
    // case key === 'inverse': return { ...memo, color: colors.text.inverse };
    case key === 'button': return { ...memo,
      fontSize: 22, lineHeight: 28,
      fontFamily: 'BebasNeue',
      marginRight: 0
    };
    default: return memo;
  }
};
const defaults = {
  backgroundColor: 'transparent',
};

export const text = (props) => {
  return _.reduce(props, getStyles, defaults);
};

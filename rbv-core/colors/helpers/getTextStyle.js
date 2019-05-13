import { colors } from '../colorPalette';
import { typography } from '../typography';
import _ from 'lodash';

const colorOptions = [
  'primary',
  'secondary',
  'tertiary',
  'error',
  'info',
  'success',
  'warning',
  'inverse'
];

const sizeOptions = [
  'button',
  'display1',
  'display2',
  'display3',
  'display4',
  'display5',
  'display6',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6'
];

// accepts: properties object, options array
// returns: the first option listed that matches a given style
const findOptionInProps = (props, options) => {
  return _.findKey(
    props,
    (value, key) => value === true && _.includes(options, key)
  );
};

const getTextSize = (props) => {
  let { sizeClass = undefined } = props;

  // use sizeClass if explicitly defined
  if (sizeClass && _.includes(sizeOptions, sizeClass)) {
    sizeClass = _.toLower(sizeClass);
    // use implicit size class
  } else if (findOptionInProps(props, sizeOptions) !== undefined) {
    sizeClass = findOptionInProps(props, sizeOptions);
  }

  if (sizeClass) {
    const header = _.includes(sizeClass, 'h');
    const display = _.includes(sizeClass, 'display');
    const color = _.has(props, 'colorClass')
      ? colors.brand[_.toLower(props.colorClass)]
      : display
        ? colors.gray.darker
        : colors.brand.primary;
    return {
      fontFamily: display ? 'Roboto, sans-serif' : 'BebasNeue',
      fontSize: typography[`${sizeClass}FontSize`],
      fontWeight: display ? (props.thin ? 200 : 400) : 600,
      textTransform: header || display ? 'uppercase' : undefined,
      letterSpacing: display ? '1px' : '1.75px',
      marginBottom: 0,
      color: props.inverse ? colors.text.inverse : color
    };
  }
  // send back the default
  return { fontSize: typography.fontSize };
};

const getTextColor = (props) => {
  const { colorClass } = props;
  switch (true) {
    case props.inverse:
      return colors.text.inverse;
    case _.has(props, 'colorClass'):
      return colors.brand[_.toLower(colorClass)];
    case findOptionInProps(props, colorOptions) !== undefined:
      return colors.brand[findOptionInProps(props, colorOptions)];
    default:
      return colors.text.primary;
  }
};

export const getTextStyle = (props) => {
  return {
    color: getTextColor(props),
    ...getTextSize(props),
    fontStyle: props.em ? 'italic' : 'none'
  };
};

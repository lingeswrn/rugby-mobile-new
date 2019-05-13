import { colors, fade } from 'rbv-core/colors';

const baseTitle = {
  alignSelf: 'center',
  backgroundColor: 'transparent',
  color: colors.text.primary,
  letterSpacing: 1.5
};

export const zeroDataTitle = {
  ...baseTitle,
  color: colors.gray.primary
};

export const zeroDataContainer = {
  flex: 1,
  justifyContent: 'center'
};

export const segmentItem = (segment, status = {}) => {
  const { type, variant } = status.segmentStatusTypes[segment];
  const color = colors[type][variant];
  const segStat = status[`${segment}Status`];
  const wrapper = {
    paddingHorizontal: 12,
    borderLeftWidth: segment === 'cardio' ? 0 : 1,
    borderLeftColor: segment === 'cardio' ?
      undefined : colors.gray.primary,
  };

  return {
    cardContainer: {
      backgroundColor: fade(colors.gray.lighter),
      flexDirection: 'row',
      paddingVertical: 8,
    },
    wrapper,
    zeroDataWrapper: { ...wrapper },
    container: {
      alignItems: 'stretch',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      ...baseTitle,
      color: segStat !== 'complete' ? colors.text.primary : color
    },
    label: { color: segStat !== 'complete' ? colors.text.primary : color },
    value: { color: segStat !== 'complete' ? colors.text.primary : color }
  };
};
export const cardWrapper = {};

/* START BUTTON */
export const startButton = ({ type, variant }, disabled) => {
  return {
    borderColor: disabled ? colors.text.disabled : colors[type][variant],
    marginTop: 8,
    shadowOpacity: 0,
  };
};

export const buttonLabel = ({ type, variant }, isFuture, disabled) => {
  const color = {
    color: disabled ? colors.text.disabled : colors[type][variant],
  };
  if (isFuture) return { ...color, fontSize: 24 };
  return color;
};

export const startButtonIcon = ({ type, variant }, disabled) => {
  return { color: disabled ? colors.text.disabled : colors[type][variant] };
};

export const matchDetailsPlaceholder = {
  paddingHorizontal: 25,
  paddingVertical: 12
};

export const title = {
  alignSelf: 'center',
  paddingTop: 35,
  minHeight: 100
};

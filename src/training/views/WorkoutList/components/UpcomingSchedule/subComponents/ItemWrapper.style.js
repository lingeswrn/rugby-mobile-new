import { colors } from 'rbv-core/colors';
export const wrapper = {
  borderBottomColor: colors.canvas.inverse,
  borderBottomWidth: 0.5,
  flex: 1,
  marginLeft: 0
};
export const container = (isOpen) => ({
  backgroundColor: colors.canvas.primary,
  shadowColor: colors.canvas.inverse,
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: isOpen ? 0.25 : 0,
  shadowRadius: 4
});

export const dataWrapper = (isOpen) => ({
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
  paddingVertical: isOpen ? 13 : 10
});
export const workoutData = ({ isCurrent, isFuture }) => {
  let color = colors.text.primary;
  switch(true) {
    case isCurrent: color = colors.brand.primary; break;
    case isFuture: color = colors.gray.primary; break;
    default: break;
  }
  return {
    dayLabel: { color, fontSize: isCurrent ? 30 : 24 },
    label: { color, fontSize: 16 },
    value: { color },
    valueRight: { color, alignSelf: 'flex-end', fontSize: 30 }
  };
};

export const metricWrapper = {
  alignItems: 'center',
  paddingHorizontal: 8
};

export const dayWrapper = {
  ...metricWrapper,
  alignItems: 'flex-start'
};

export const dataContainer = {
  flex: 2.5,
  flexDirection: 'row',
  justifyContent: 'space-between'
};

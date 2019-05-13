import * as matColors from 'rbv-core/colors/materialColorWheel';
import { colors, fade } from 'rbv-core/colors';

export const wrapper = {
  flex: 1.70,
  justifyContent: 'center',
  alignItems: 'center'
};

export const itemWrapper = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center'
};

export const progressBar = {
  // transform: [{ rotateY: '180deg' }]
};


export const progressBarColors = {
  carbs: matColors.green900,
  fat: matColors.deepPurple900,
  protein: matColors.pink900,
  unfilled: colors.gray.lighter
};

const fadeAmt = 0.85;
export const barColorsUnfilled = {
  carbs: fade(matColors.green900, fadeAmt),
  fat: fade(matColors.deepPurple900, fadeAmt),
  protein: fade(matColors.pink900, fadeAmt),
  unfilled: colors.gray.lighter
};

export const labelWrapper = {
  position: 'absolute',
  flexDirection: 'row',
  justifyContent: 'space-between',
  left: 6,
  right: 5
};

export const itemLabel = {
  color: colors.text.primary
};

export const itemLabelValue = (key) => {
  return {
    color: colors.text.inverse,
    textShadowColor: progressBarColors[key],
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1
  };
};
/* MOCKUP SPEC */
// export const itemLabel = {
//   color: colors.gray.primary,
//   marginLeft: 4
// };

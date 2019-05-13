import _ from 'lodash';

export const kgToLb = (kg, roundTo = 0) => _.round(kg * 2.204622, roundTo);
export const lbToKg = (lb, roundTo = 0) => _.round(lb / 2.204622, roundTo);

export const lbToKgModTwo = (lb) => {
  const kg = lbToKg(lb);
  return kg - (kg % 2);
};

export const kmToMiles = (m, roundTo = 0) => _.round(m / 1.609344, roundTo);
export const metersToMiles = (m, roundTo = 0) =>
  _.round(kmToMiles(m / 1000), roundTo);
export const milesToKm = (m, roundTo = 0) => _.round(1.609344 * m, roundTo);

export const inToCm = (inches, roundTo = 0) => _.round(inches * 2.54, roundTo);
export const cmToIn = (cm, roundTo = 0) => _.round(cm / 2.54, roundTo);

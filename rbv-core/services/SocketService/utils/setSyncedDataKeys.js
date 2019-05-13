import _ from 'lodash';
import pluralize from 'pluralize';

const mapKeys = (lists) => {
  return _.mapKeys(lists, (value, key) => {
    switch(key) {
      case 'staticData':
        return key;
      case 'User':
        return 'user';
      default: return _.camelCase(pluralize(key));
    }
  });
};

export const setSyncedDataKeys = (data) => {
  return new Promise((resolve) => resolve(mapKeys(data)));
};

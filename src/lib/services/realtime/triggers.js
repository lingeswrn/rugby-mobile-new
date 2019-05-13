import _ from 'lodash';

export const triggers = {
  hasAccount: false,
  hasFeedsListener: false,
  hasMessageListeners: false
};

export const setTriggers = (update) => {
  _.assign(triggers, update);
  return Promise.resolve();
};

import _ from 'lodash';
import moment from 'moment';

export function processDailyLogEntries(entries) {
  const processed = _.map(entries, (entry) => {
    const { date } = entry;
    return {
      ...entry,
      date: moment(date).format('X')
    };
  });

  return _.sortBy(processed, 'date');
}

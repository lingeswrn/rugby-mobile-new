import _ from 'lodash';
import moment from 'moment';

import { colors } from '../../../../colors';

function getStatusColor(status) {
  switch(status) {
    case 'trialing':
      return colors.brand.warning;
    case 'active':
      return colors.brand.success;
    default:
      return colors.brand.danger;
  }
}

function getIntervalAbbreviation(interval) {
  switch(interval) {
    case 'month':
      return 'mo.';
    case 'year':
      return 'yr.';
    default:
      return undefined;
  }
}

function getPlanSeatCapacity(id) {
  switch(id) {
    case 'rugby-vault-club':
      return 'Unlimited';
    case 'rugby-vault-squad':
      return '30';
    default:
      return '1';
  }
}

export function formatSubscriptionData(account) {
  if (!account.subscriptions || !account.subscriptions.total_count) return {};

  const source = _.find(account.sources.data, { id: account.default_source });
  const subscription = account.subscriptions.data[0];
  const { plan } = subscription;

  return {
    amount: Number(plan.amount / 100).toLocaleString('en', {
      style: 'currency',
      currency: _.upperCase(plan.currency),
      currencyDisplay: 'symbol'
    }),
    cardLast4: source ? source.last4 : null,
    cardType: source ? _.upperCase(source.brand) : null,
    customerId: account.id,
    interval: getIntervalAbbreviation(plan.interval),
    name: plan.name,
    nextPayment: moment(subscription.current_period_end, 'X').format('MMM D, YYYY'),
    obj: subscription,
    seats: getPlanSeatCapacity(plan.id),
    source,
    status: _.upperFirst(_.lowerCase(subscription.status)),
    statusIconColor: getStatusColor(subscription.status)
  };
}

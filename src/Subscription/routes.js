import {
  Subscription,
  NoSubscription,
  Membership
} from './containers';
import { ensureStripeAccount } from './hoc';

export const SubscriptionRoutes = [
  {
    component: ensureStripeAccount(Subscription),
    path: '/account/subscription'
  }, {
    component: ensureStripeAccount(NoSubscription),
    path: '/account/no-subscription'
  }, {
    component: Membership,
    path: '/account/membership'
  }
];

import { config } from 'src/config';
import Stripe from 'tipsi-stripe';
import { Subscription } from 'rbv-core/services/Rugbyvault/SubscriptionService';

export const SubscriptionService = new Subscription(Stripe, config.stripeToken);

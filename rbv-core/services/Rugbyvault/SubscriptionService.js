import _ from 'lodash';

import * as utils from './utils';
import { _RugbyvaultApi } from './RugbyvaultApi';


export class Subscription extends _RugbyvaultApi {
  constructor(Stripe, publishableKey) {
    super();
    this.Stripe = Stripe;
    Stripe.init({ publishableKey });
  }

  getRequest() {
    return super.getStripeRequest();
  }

  formatSubscriptionData(account) {
    return utils.formatSubscriptionData(account);
  }

  getAccount(id) {
    return this.getRequest()
    .then((request) => request.get(`/customers/retrieve/${id}`));
  }

  /* runs inside updatePaymentMethod */
  createToken(params, type = 'card') {
    return this.Stripe[`createTokenWith${_.upperFirst(type)}`](params)
    .then((token) => {
      if (_.isEmpty(token)) {
        return Promise.reject('error');
      }
      return Promise.resolve(token.tokenId);
    });
  }

  /* runs inside updatePaymentMethod */
  setDefaultCard(customerId, token) {
    return this.getRequest()
    .then((request) => request.put('set-default-card', {
      id: customerId,
      token
    }));
  }

  updatePaymentMethod(customerId, params) {
    return this.createToken(params, 'card')
    .then((token) => this.setDefaultCard(customerId, token))
    .then((resp) => {
      if (resp.data) return Promise.resolve(resp.data);
      return Promise.reject({ code: 'request failure' });
    });
  }

  deleteSubscription(id) {
    return this.getRequest()
    .then(request => request.put(`/subscriptions/del/${id}`))
    .then(() => Promise.resolve());
  }

  createSubscription(id) {
    return this.getRequest()
    .then(request => request.put('/subscriptions/create', {
      plan: 'rugby-vault-individual',
      customer: id,
      trial_end: 'now'
    }));
  }

  newSubscription(customerId, params) {
    return this.createSubscription(customerId)
    .then(() => {
      return this.createToken(params, 'card')
      .then((token) => this.setDefaultCard(customerId, token));
    })
    .then(({ data }) => {
      if (data) return Promise.resolve(data);
      return Promise.reject({ code: 'request failure' });
    });
  }

  retrieveUpcomingInvoice(customerId) {
    return this.getRequest()
    .then(request => request.put(`/invoices/retrieveUpcoming/${customerId}`))
    .then(({ data }) => {
      console.log('RESPONSE', data);
      return Promise.resolve(data);
    });
  }

  getInvoices(customer) {
    return this.getRequest()
    .then(request => request.put('/invoices/list/', { customer }))
    .then(({ data }) => Promise.resolve(data.data));
  }

  listPlans() {
    return this.getRequest()
    .then(request => request.put('/plans/list/', { active: true, limit: 20 }))
    .then(({ data }) => Promise.resolve(data));
  }
}

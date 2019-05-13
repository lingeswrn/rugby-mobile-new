import _ from 'lodash';
import types from 'src/actionTypes';
import { SubscriptionService } from '../SubscriptionService';

export const getSubscriptions = () => (dispatch, getState) => {
  const { individual, group } = getState().subscription.stripeAccount;
  if (individual.subscriptions) {
    dispatch({
      type: types.GET_SUBSCRIPTION_INDIVIDUAL,
      payload: individual.subscriptions.data[0]
    });
  } else dispatch({ type: types.GET_SUBSCRIPTION_INDIVIDUAL, payload: null });
  if (!_.isEmpty(group)) {
    dispatch({
      type: types.GET_SUBSCRIPTION_GROUP,
      payload: group.subscriptions.data[0]
    });
  } else dispatch({ type: types.GET_SUBSCRIPTION_GROUP, payload: null });
  return Promise.resolve();
};

const getStripeAccount = (id, accountType = 'individual') => (dispatch) => {
  return SubscriptionService.getAccount(id)
  .then(({ data }) => {
    dispatch({
      type: types.GET_STRIPE_ACCOUNT,
      payload: { accountType, data }
    });
    return Promise.resolve(data);
  });
};

export const setDefaultCard = (...args) => (dispatch) => {
  return SubscriptionService.updatePaymentMethod(...args)
  .then((account) => {
    dispatch({
      type: types.GET_STRIPE_ACCOUNT,
      payload: {
        accountType: 'individual',
        data: account
      }
    });
    return Promise.resolve(account);
  });
};

export const _getStripeAccounts = () => (dispatch, getState) => {
  const { data, organizations: { active }} = getState().user;
  const user = data;
  const organization = active;
  if (!user) return Promise.reject({ message: 'Something went wrong.' });
  if (user.stripeId) {
    return dispatch(getStripeAccount(user.stripeId, 'individual'))
    .then(() => {
      if (organization.stripeId) {
        return dispatch(getStripeAccount(organization.stripeId, 'group'));
      }
      return Promise.resolve();
    });
  } else if (organization.stripeId) {
    return dispatch(getStripeAccount(organization.stripeId, 'group'));
  }
  return Promise.resolve();
};

export const getStripeAccounts = () => (dispatch) => {
  return dispatch(_getStripeAccounts())
  .then(() => dispatch(getSubscriptions()));
};

export const cancelSubscription = () => (dispatch, getState) => {
  const { userSubscription } = getState().subscription;
  if (!userSubscription) {
    return Promise.reject({
      message: 'No subscription found.'
    });
  }
  return SubscriptionService.deleteSubscription(userSubscription.id)
  .then(() => dispatch(getStripeAccounts()));
};

export const createSubscription = (...args) => (dispatch) => {
  return SubscriptionService.newSubscription(...args)
  .then(() => dispatch(getStripeAccounts()));
};

export const retrieveUpcomingInvoice = () => (dispatch, getState) => {
  const { stripeId } = getState().user.data;
  return SubscriptionService.retrieveUpcomingInvoice(stripeId);
};

export const getInvoices = () => (dispatch, getState) => {
  const { stripeId } = getState().user.data;
  return SubscriptionService.getInvoices(stripeId)
  .then(payload => {
    dispatch({ type: types.GET_INVOICES, payload });
    return Promise.resolve(payload);
  });
};

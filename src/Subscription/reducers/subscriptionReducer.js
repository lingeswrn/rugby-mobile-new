import types, { _global } from 'src/actionTypes';

const INITIAL_STATE = {
  stripeAccount: {
    individual: {},
    group: {}
  },
  userSubscription: null,
  groupSubscription: null,
  invoices: []
};

export function subscriptionReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case types.GET_STRIPE_ACCOUNT:
      return { ...state,
        stripeAccount:
        { ...state.stripeAccount,
          [payload.accountType]: payload.data
        }
      };
    case types.GET_SUBSCRIPTION_INDIVIDUAL:
      return { ...state, userSubscription: payload };
    case types.GET_SUBSCRIPTION_GROUP:
      return { ...state, groupSubscription: payload };
    case types.GET_INVOICES:
      return { ...state, invoices: payload };
    case 'RESET_SUBSCRIPTION_DATA':
    case _global.RESET_USER_DATA:
      return INITIAL_STATE;
    case _global.DATA_VERSION_CHANGE: return INITIAL_STATE;
    default: return state;
  }
}

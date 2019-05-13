import _ from 'lodash';
import types from 'src/actionTypes';
const init = {
  account: {},
  feeds: [],
  messages: {},
  selected: null
};
export const realtimeReducer = (state = init, { meta = {}, payload, type }) => {
  const { feedId } = meta;

  switch(type) {
    case types.DELETE_FEED: return { ...state, feeds: payload };
    case types.DELETE_MESSAGE: return { ...state, messages:
      _.omitBy({ ...state.messages, [feedId]: payload }, _.isEmpty) };
    case types.GET_ACCOUNT: return { ...state, account: payload };
    case types.GET_FEEDS: return { ...state, feeds: payload };
    case types.GET_MESSAGES: return { ...state, messages: payload };
    case types.LEAVE_FEED:
      return { ...state,
        account: { ...state.account, conversations: payload.conversations },
        feeds: payload.feeds
      };
    case types.NEW_FEED:
      return { ...state, feeds: _.concat(state.feeds, payload) };
    case types.SET_NEW_MESSAGE:
      return { ...state, messages: { ...state.messages,
        [feedId]: _.concat([], state.messages[feedId] || [], payload) }};
    case types.SET_SELECTED_FEED: return { ...state, selected: payload };
    case types.UPDATE_FEED_MESSAGES:
      return { ...state, messages: { ...state.messages, [feedId]: payload }};
    case 'RESET_USER_DATA': return init;
    case 'RESET_REALTIME': return init;
    default: return state;
  }
};

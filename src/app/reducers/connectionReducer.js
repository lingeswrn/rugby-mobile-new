import types, { offline } from 'src/actionTypes';
import _ from 'lodash';

const INIT = {
  /* redundant from network.isConnected */
  connected: false,

  /* whether socket is actively trying to reconnect */
  connecting: true,
  /* backoff value from socket */
  delay: 1,

  /* if disconnected, this can be 'network' (i.e. device) or 'server' (RBV);
   * should be null when connected.
   */
  disconnectSource: null,
  queue: []
};

const DEFAULT_META = { source: INIT.disconnectSource };

export const connectionReducer = (
  state = INIT,
  { local = DEFAULT_META, payload, type }
) => {
  switch(type) {
    case offline.CONNECTION_CHANGE:
      return { ...state,
        connected: payload,
        disconnectSource: payload === false ?
          local.source ? local.source : 'device' : null
      };
    case types.SET_SOCKET_CONNECTING: return { ...state, ...payload };
    case types.ENQUEUE_OFFLINE_EVENT:
      return { ...state,
        queue: _.concat(state.queue, payload)
      };
    default: return state;
  }
};

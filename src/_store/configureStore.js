import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { config as env } from 'src/config';
import { StoreActionBlacklist as blacklist } from './storeActionBlacklist';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import debounce from 'redux-storage-decorator-debounce';
import merger from 'redux-storage-merger-simple';
import thunk from 'redux-thunk';
import { history } from './history';
import { routerMiddleware } from 'react-router-redux';
// import { createNetworkMiddleware } from 'react-native-offline';
import { checkInitialConnection } from './checkInitialConnection';
import { offline } from 'src/actionTypes';

export function configureStore(done) {
  // const networkMiddleware = createNetworkMiddleware();
  let rootReducer = require('./rootReducer').rootReducer;
  const engine = debounce(createEngine(env.LOCAL_STORE_KEY), 1000);
  const loader = storage.createLoader(engine);
  const storageMiddleware = storage.createMiddleware(engine, blacklist);
  const routeMiddleware = routerMiddleware(history);
  const store = createStore( // eslint-disable-line
    storage.reducer(rootReducer, merger),
    composeWithDevTools(
      applyMiddleware(
        thunk,
        storageMiddleware,
        routeMiddleware,
      )
    )
  );

  if (module.hot) {
    module.hot.accept(() => {
      rootReducer = require('./rootReducer').rootReducer;
      store.replaceReducer(storage.reducer(rootReducer, merger));
    });
  }

  loader(store)
  .then(checkInitialConnection)
  .then((status) => {
    store.dispatch({
      type: offline.CONNECTION_CHANGE,
      payload: status
    });
    done();
  });

  return store;
}

import { Socket } from '../SocketService';
import _ from 'lodash';
import types from '../../../actionTypes';

export class ConnectedSocketService {
  constructor(dispatch, getState, config) {
    this._Socket = new Socket();
    this.getState = getState;
    this.config = config || {};
  }
  get state() { return this.getState(); }
  get connected() { return this.state.connection.connected; }

  /* EVENTS */
  create(...args) { return this.handleEvent('create', ...args); }
  retrieve(...args) { return this.handleEvent('retrieve', ...args); }
  findById(...args) { return this.handleEvent('findById', ...args); }
  findOne(...args) { return this.handleEvent('findOne', ...args); }
  search(...args) { return this.handleEvent('search', ...args); }
  list(...args) { return this.handleEvent('list', ...args); }
  update(...args) {return this.handleEvent('update', ...args);}
  remove(...args) { return this.handleEvent('remove', ...args); }
  subDocs = (...pArgs) => ({
    create: (...args) => this.handleEvent('sub-doc', 'create', ...pArgs, ...args ),
    remove: (...args) => this.handleEvent('sub-doc', 'remove', ...pArgs, ...args ),
    update: (...args) => this.handleEvent('sub-doc', 'update', ...pArgs, ...args )
  })

  /* QUEUE HANDLERS */
  addToQueue(event, ...args) {
    this.dispatch({
      type: types.ENQUEUE_OFFLINE_EVENT,
      payload: { event, args }
    });
  }

  emptyQueue() {
    return Promise.all(
      _.map(this.state.connected.queue, ({ event, args }) =>
        this.handleEvent(event, ...args)
      ));
  }

  handleOffline(event, ...args) {
    /* check for offlinePayload prop in config */
    if (_.has(this.config, 'offlinePayload')) {
      const { offlinePayload } = this.config;
      /* check for conditional and make sure it passes */
      const conditional = _.has(offlinePayload, 'dependsOn');
      if (conditional) {
        if (!offlinePayload.dependsOn(this.state)) {
          return Promise.reject('disconnected');
        }
      }

      if (this.config.queue) {
        this.addToQueue(event, ...args);
      }

      /* check through various possible return methods */
      let payload;
      if (_.has(offlinePayload, 'fromState')) {
        const { fromState } = offlinePayload;
        switch(typeof fromState) {
          case 'function': payload = offlinePayload.fromState(this.state); break;
          case 'string': payload = this.state[_.toPath(fromState)]; break;
          default: break;
        }
      } else if (_.has(offlinePayload, 'payload')) {
        payload = offlinePayload.payload;
      }
      if (payload) return Promise.resolve(payload);
    }
    return Promise.reject('disconnected');
  }

  handleEvent(event, ...args) {
    if (this.connected) return this._Socket.handleEvent(event, ...args);
    return this.handleOffline(event, ...args);
  }

  execEvent(event, ...args) {
    if (this.connected) return this._Socket.execEvent(event, ...args);
    return Promise.reject('disconnected');
  }
}

export const ConnectedSocket = (dispatch, getState, config = {}) =>
  new ConnectedSocketService(dispatch, getState, config);

import _ from 'lodash';
import types from 'src/actionTypes';
import { SocketService } from 'rbv-core/services/SocketService/SocketService';
import { each, parallel, reduce } from 'async';
import { triggers, setTriggers } from './triggers';


class Realtime {
  constructor(dispatch, getState) {
    this.dispatch = dispatch;
    this.getState = getState;

    if (_.isEmpty(getState().realtime.account)) {
      this.getAccount();
    }
    if (!triggers.hasAccount) {
      setTriggers({ hasAccount: true }).then(() => this.getAccount());
    }
  }

  get state() { return this.getState().realtime; }
  get organization() { return this.getState().user.organizations.active;}
  get user() { return this.getState().user.data; }
  get selectedFeed() {
    if (!this.state.selected) return {};
    return _.find(this.state.feeds, { id: this.state.selected }) || {};
  }

  /* CORE METHODS */

  create(path, data) {
    return SocketService.handleEvent('rts:create', path, data)
    .then(this.parse);
  }
  update(path, id, body) {
    return SocketService.handleEvent('rts:update', path, id, body)
    .then(this.parse);
  }
  delete(path, id) {
    return SocketService.handleEvent('rts:purge', path, id);
  }
  list(path, params) {
    return SocketService.handleEvent('rts:list', path, params).then(this.parse);
  }
  findById(path, id, params) {
    return SocketService.handleEvent('rts:find-by-id', path, id, params)
    .then(this.parse);
  }
  parse(res) {
    const response = JSON.parse(res);
    return Promise.resolve(response);
  }

  /* /CORE METHODS */

  /* EVENT-HANDLERS */
  getAccount = () =>
    this.findById('users', this.user._id, { populate: ['conversations']})
    .then(({ data }) => {
      this.dispatch({ type: types.GET_ACCOUNT, payload: data });
      return this.joinFeedRooms(data.conversations)
      .then(() => Promise.resolve(data));
    })
    .catch(err => {
      if (err.name === 'DocumentNotFoundError') return Promise.resolve(null);
      console.log(err);
      return Promise.reject(err);
    })

  createAccount = () => this.create('users', {
    id: this.user._id,
    name: {
      first: this.user.name.first,
      last: this.user.name.last,
      full: `${this.user.name.first} ${this.user.name.last}`
    },
    email: this.user.email
  })
  .then(() => this.getAccount())
  .catch(err => {
    console.log(err);
    return Promise.reject(err);
  })

  refreshFeedAndSetActive = (id) => this.findById('conversations', id, { populate: ['users', 'recipient']})
  .then(({ data }) => {
    const { feeds } = this.state;
    const index = _.findIndex(this.state.feeds, { id });
    feeds[index] = data;
    this.dispatch({ type: types.SET_SELECTED_FEED, payload: id });
    this.dispatch({ type: types.GET_FEEDS, payload: feeds });
    return Promise.resolve(data);
  })

  createFeed = formData =>
    this.create('conversations', { ...formData, orgId: this.organization._id })
    .then(({ data }) => this.joinFeed(data.id))
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    })
  updateFeed = (id, body) =>
    this.update('conversations', id, body)
    .then(({ data }) => this.refreshFeedAndSetActive(data.id))
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    })

  createAndJoinRecipient = (recipientData, feed) => {
    if (!recipientData) return Promise.resolve({ feed });
    return this.create('recipients', { ...recipientData, orgId: this.organization._id })
    .then(({ data }) => SocketService.handleEvent('rts:add-recipient', data.id, feed.id))
    .then(this.parse)
    .then(({ recipient }) => {
      SocketService.socket.emit('rts:subscribe-to-feeds', [feed.id]);
      return Promise.resolve({ recipient, feed });
    });
  }

  addUserToFeed = (userId, feed) => {
    if (!userId) return Promise.resolve({ feed });
    return SocketService.handleEvent('rts:join-conversation', userId, feed.id)
    .then(this.parse)
    .then(() => Promise.resolve({ feed }));
  }

  joinFeed = (feedId) =>
    SocketService.handleEvent('rts:join-conversation', this.user._id, feedId)
    .then(this.parse)
    .then((res) => {
      const { account, feed } = res;
      SocketService.socket.emit('rts:subscribe-to-feeds', [feed.id]);
      if (account) {
        this.dispatch({ type: types.GET_ACCOUNT, payload: account });
        const { feeds } = this.state;
        const index = _.findIndex(this.state.feeds, { id: feed.id });
        feeds[index] = feed;

        this.dispatch({ type: types.GET_FEEDS, payload: feeds });
        this.addMessageListeners({ id: feedId }, (err) => {
          if (err) console.error(err);
        });
      }
      return Promise.resolve({ feed });
    })

  /*  ######## MESSAGES ######## */
  addMessageListeners = ({ id }, next) => {
    SocketService.socket.on(`${id}:create`, (res) => {
      this.parse(res).then(({ data }) => {
        this.dispatch({
          type: types.SET_NEW_MESSAGE,
          payload: {
            ...data,
            from: _.find(this.selectedFeed.users, { id: data.sender })
          },
          meta: { feedId: id }
        });
        return Promise.resolve(data);
      });
    });
    SocketService.socket.on(`${id}:delete`, (res) => {
      this.parse(res).then(({ data }) => {
        const messages = this.getState().realtime.messages[id];
        this.dispatch({
          type: types.DELETE_MESSAGE,
          meta: { feedId: id },
          payload: _.differenceBy(messages, [data], 'id')
        });
      });
    });
    next();
  }

  addFeedsListener = (cb) => {
    SocketService.socket.on('feeds:create', (res) => {
      this.parse(res).then(({ data = {}}) => {
        if (!data.id) {
          return Promise.reject({
            message: 'something went wrong when creating a new feed' });
        }
        return this.findById('conversations', data.id, { populate: ['users', 'recipient']});
      })
      .then(({ data }) => {
        this.dispatch({ type: types.NEW_FEED, payload: data });
        return Promise.resolve(data);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
    });
    SocketService.socket.on('feeds:update', (res) => {
      this.parse(res).then((data) => console.log('updated feed: ', data));
    });
    SocketService.socket.on('feeds:delete', (res) => {
      this.parse(res).then(({ data }) => {
        const { feeds } = this.state;
        this.dispatch({
          type: types.DELETE_FEED, payload: _.differenceBy(feeds, [data], 'id')
        });
        return Promise.resolve();
      });
    });
    cb(null, null);
  }

  joinFeedRooms(feeds) {
    return new Promise((res, rej) => {
      if (triggers.hasMessageListeners) res();
      else {
        console.info('setting event listeners.');
        const initialFeeds = ['feeds'];
        const feedIds = _.map(feeds, ({ id }) => id);

        SocketService.socket.emit('rts:subscribe-to-feeds',
          _.concat(initialFeeds, feedIds)
        );
        parallel([
          (cp) => this.addFeedsListener(cp),
          (cp) => each(feeds, this.addMessageListeners, cp)
        ], (err) => {
          if (err) rej(err);
          else {
            setTriggers({ hasMessageListeners: true })
            .then(res)
            .catch(rej);
          }
        });
      }
    });
  }

  getConversations = () => {
    const recipientIds = [];
    if (_.has(this.organization, ['_id'])) recipientIds.push(this.organization._id);
    if (_.has(this.user, ['squad', '_id'])) recipientIds.push(this.user.squad._id);
    return SocketService.handleEvent(
      'rts:get-conversations', this.user._id, recipientIds
    )
    .then(this.parse)
    .then((payload) => {
      this.dispatch({ type: types.GET_FEEDS, payload });
      return Promise.resolve(payload);
    });
  }

  setSelectedFeed = (id) => {
    this.dispatch({ type: types.SET_SELECTED_FEED, payload: id });
    return Promise.resolve();
  }

  /*  ######## MESSAGES ######## */
  getMessages = () => {
    return SocketService
    .handleEvent('rts:get-messages', this.surfaceFromState('feeds', 'id'))
    .then(this.parse)
    .then(({ data }) => {
      return new Promise((res, rej) =>
        reduce(data, {}, (memo, { group, reduction }, cb) => {
          cb(null, { ...memo, [group]: reduction });
        }, (err, messages) => {
          if (err) rej(err);
          else res(messages);
        }));
    })
    .then((payload) => {
      this.dispatch({ type: types.GET_MESSAGES, payload });
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
  }

  createMessage = (data) => {
    return this.create('messages', {
      ...data, conversationId: this.state.selected, sender: this.user._id
    });
  }

  deleteFeed = (id) => {
    return SocketService.handleEvent('rts:delete-conversation', id)
    .catch(err => {
      if (_.isEmpty(err)) return Promise.resolve();
      console.log(err);
      return Promise.reject(err);
    });
  }
  /* /EVENT-HANDLERS */

  /* HELPERS */
  surfaceFromState(path, value) {
    return _.map(this.state[path], (item) => item[value]);
  }
  /* /HELPERS */
}

export const connectRealtimeService = () => (d, gS) => new Realtime(d, gS);

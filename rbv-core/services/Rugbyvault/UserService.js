import { AuthService } from 'src/lib/services';
import { ConnectedSocket, SocketService } from '../SocketService';
class _UserService {
  constructor(dispatch, getState) {
    this.dispatch = dispatch;
    this.getState = getState;
  }

  Socket(config) {
    if (this.dispatch && this.getState) {
      return ConnectedSocket(this.dispatch, this.getState, config);
    } return SocketService;
  }

  updateAthleteProfile(update, _id) {
    return this.Socket({
      offlinePayload: {
        fromState: (state) => ({ ...state.user.data.athleteProfile, ...update })
      },
      queue: true,
    }).update('athlete-profiles', _id, update, { populate: ['strengthTest']});
  }

  updateConfig(update, _id) {
    return this.Socket({
      offlinePayload: {
        fromState: (state) => ({ ...state.user.data.appConfig, ...update })
      },
      queue: true,
    }).update('user-app-configs', _id, update);
  }

  checkIfExists(email) {
    return SocketService.findOne('users', { email }, {})
    .then(doc => {
      return doc
        ? Promise.reject({ message: 'This email is already being used by another account' })
        : Promise.resolve();
    });
  }

  create(formData) {
    return this.checkIfExists(formData.email)
    .then(() => Promise.all([
      AuthService.createNewAccount(formData.email, formData.password),
      this.Socket().handleEvent('account:create', formData)
    ]))
    .then(([account, data]) => {
      return Promise.resolve({ account, data });
    });
  }

  updateApiUser(update, _id) {
    return this.Socket({
      offlinePayload: {
        fromState: (state) => ({ ...state.user.data, ...update })
      },
      queue: true,
    }).update('users', _id, update, {
      params: {
        populate: [{
          path: 'athleteProfile',
          populate: ['strengthTest']
        },
        'appConfig',
        'metadata'
        ]}
    });
  }

  signOut() {
    return AuthService.signOut()
    .catch(({ code, message }) => {
      console.error(`signout failed with code ${code} because ${message}`);
      return { code, message };
    });
  }
}

export const UserService = new _UserService();
export const ConnectedUserService = (...args) => new _UserService(...args);
